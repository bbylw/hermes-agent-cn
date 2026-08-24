import docsNavJson from "./docs-nav.json";
import zhSetJson from "./zh-doc-set.json";

export interface NavDoc {
  type: "doc";
  id: string;
  zh: boolean;
  title: string | null;
}
export interface NavCategory {
  type: "category";
  label: string;
  items: NavNode[];
}
export type NavNode = NavDoc | NavCategory;

export const docsNav = docsNavJson as unknown as NavNode[];
export const zhSet = new Set<string>(zhSetJson as unknown as string[]);

// Dynamic glob — each downloaded doc becomes its own lazily-loaded chunk.
const modules = import.meta.glob("/src/content/docs/**/*.{md,mdx}", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

export interface DocMeta {
  title: string | null;
  description: string | null;
}

/** Parses the `title:` / `description:` fields from the YAML frontmatter. */
function parseMeta(raw: string): DocMeta {
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return { title: null, description: null };
  const grab = (key: string) => {
    const m = fm[1].match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, "m"));
    return m ? m[1].replace(/["']+$/g, "").trim() : null;
  };
  return { title: grab("title"), description: grab("description") };
}

export async function loadDoc(id: string): Promise<{ raw: string; meta: DocMeta } | null> {
  const loader = modules[`/src/content/docs/${id}.md`] ?? modules[`/src/content/docs/${id}.mdx`];
  if (!loader) return null;
  const raw = (await loader()).replace(/^\uFEFF/, ""); // strip UTF-8 BOM
  return { raw, meta: parseMeta(raw) };
}

const EXTERNAL_RE = /^(https?:|mailto:|tel:)/;

/** Resolves a markdown link target to either an in-app /docs route or the external docs site. */
function resolveTarget(target: string, currentId: string): string {
  const hashIdx = target.indexOf("#");
  const anchor = hashIdx >= 0 ? target.slice(hashIdx) : "";
  let p = hashIdx >= 0 ? target.slice(0, hashIdx) : target;

  if (EXTERNAL_RE.test(p)) return target;

  if (p.startsWith("/")) {
    p = p.slice(1);
  } else if (p.startsWith("./") || p.startsWith("../")) {
    const base = currentId.includes("/") ? currentId.slice(0, currentId.lastIndexOf("/")) : "";
    const parts = base ? base.split("/") : [];
    for (const seg of p.split("/")) {
      if (seg === "" || seg === ".") continue;
      if (seg === "..") parts.pop();
      else parts.push(seg);
    }
    p = parts.join("/");
  }

  p = p.replace(/\.(md|mdx)$/, "");
  if (!p) return anchor || target;
  if (zhSet.has(p)) return `/docs/${p}${anchor}`;
  return `https://hermes-agent.nousresearch.com/docs/zh-Hans/${p}${anchor}`;
}

/** Rewrites markdown links outside code fences. */
function rewriteLinks(s: string, currentId: string): string {
  let inFence = false;
  return s
    .split("\n")
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      return line.replace(/\]\(([^)\s]+?)(?:\s+["'][^"']*["'])?\)/g, (match, target: string) => {
        const resolved = resolveTarget(target, currentId);
        return resolved === target ? match : match.replace(target, resolved);
      });
    })
    .join("\n");
}

/**
 * Converts downloaded Docusaurus markdown into a plain markdown + raw-HTML
 * document that react-markdown (with rehype-raw) can render faithfully.
 */
export function preprocessMarkdown(raw: string, currentId: string): string {
  let s = raw;

  // 1. Strip YAML frontmatter
  s = s.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");

  // 2. Strip JSX import statements (only outside code fences)
  {
    let inFence = false;
    s = s
      .split("\n")
      .filter((line) => {
        if (/^\s*```/.test(line)) {
          inFence = !inFence;
          return true;
        }
        if (inFence) return true;
        return !/^import\s+.+\s+from\s+["'@]/.test(line.trim());
      })
      .join("\n");
  }

  // 3. Docusaurus custom components that we cannot replicate
  s = s.replace(/<UserStoriesCollage\s*\/?>/g, "");
  s = s.replace(/<div\s+style=\{\{[\s\S]*?\}\}[\s\S]*?<\/div>/g, (m) => {
    const src = m.match(/src="([^"]+)"/)?.[1];
    return src ? `**🎬 视频教程：[在线观看](${src})**\n\n` : "";
  });

  // 4. Normalize space-title admonitions (`:::warning 标题`) to bracket form
  s = s.replace(/^:::(note|tip|info|warning|danger|caution)\s+(.+?)\s*$/gm, ":::$1[$2]");

  // 5. Images: rewrite /img/... to the docs site origin
  s = s.replace(/(!\[[^\]]*\]\()(\/img\/[^)\s]+)\)/g, (m, pre, imgPath) => {
    return `${pre}https://hermes-agent.nousresearch.com/docs${imgPath})`;
  });

  // 6. Internal links
  s = rewriteLinks(s, currentId);

  return s;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}
