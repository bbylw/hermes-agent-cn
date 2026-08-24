import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { toHast } from "mdast-util-to-hast";
import { toHtml } from "hast-util-to-html";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import { Link } from "react-router-dom";
import { slugify } from "../content/docs";

const ADMONITION_LABELS: Record<string, string> = {
  note: "备注",
  tip: "提示",
  info: "信息",
  warning: "警告",
  danger: "危险",
  caution: "注意",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** remark plugin: converts `:::note[...]` container directives into raw HTML admonitions. */
function admonitionRemarkPlugin() {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      const d = node as { type?: string; name?: string; children?: unknown[] };
      if (d.type !== "containerDirective") return;
      if (!d.name || !(d.name in ADMONITION_LABELS)) return;
      const label = (d.children ?? []).find(
        (c) => (c as { data?: { directiveLabel?: boolean } }).data?.directiveLabel,
      );
      const title = label ? toString(label as never) : ADMONITION_LABELS[d.name];
      const body = (d.children ?? []).filter(
        (c) => !(c as { data?: { directiveLabel?: boolean } }).data?.directiveLabel,
      );
      const bodyHtml = toHtml(toHast({ type: "root", children: body } as never));
      const html = `<div class="admonition admonition-${d.name}"><div class="admonition-title">${escapeHtml(
        title,
      )}</div><div class="admonition-body">${bodyHtml}</div></div>`;
      if (parent && typeof index === "number") {
        (parent.children as unknown[])[index] = { type: "html", value: html } as never;
      }
    });
  };
}

function extractText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function Heading({ level, children }: { level: 1 | 2 | 3 | 4 | 5 | 6; children?: ReactNode }) {
  const id = slugify(extractText(children));
  const Tag = `h${level}` as const;
  return (
    <Tag id={id}>
      {children}
      {level >= 2 && (
        <a className="doc-anchor" href={`#${id}`} aria-label="链接到本节">
          #
        </a>
      )}
    </Tag>
  );
}

const EXTERNAL_RE = /^(https?:|mailto:|tel:)/;

function DocLink({ href, children }: { href?: string; children?: ReactNode }) {
  if (!href) return <a>{children}</a>;
  if (href.startsWith("/docs/")) {
    return <Link to={href}>{children}</Link>;
  }
  const external = EXTERNAL_RE.test(href);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CodeBlock({ children, lang }: { children?: ReactNode; lang: string }) {
  const [copied, setCopied] = useState(false);
  const code = extractText(children);
  const onCopy = () => {
    navigator.clipboard?.writeText(code).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      },
      () => undefined,
    );
  };
  return (
    <div className="doc-code">
      <div className="doc-code-bar">
        <span className="doc-code-lang">{lang || "code"}</span>
        <button
          type="button"
          className={copied ? "doc-code-copy copied" : "doc-code-copy"}
          onClick={onCopy}
          aria-label={copied ? "已复制代码" : "复制代码"}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? "已复制" : "复制"}</span>
        </button>
      </div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

function DocImage({ src, alt }: { src?: string; alt?: string }) {
  return (
    <figure className="doc-figure">
      <img src={src} alt={alt ?? ""} loading="lazy" />
      {alt ? <figcaption>{alt}</figcaption> : null}
    </figure>
  );
}

const components: Components = {
  a: (props) => <DocLink href={props.href}>{props.children}</DocLink>,
  img: (props) => <DocImage src={props.src} alt={props.alt} />,
  h1: (props) => <Heading level={1}>{props.children}</Heading>,
  h2: (props) => <Heading level={2}>{props.children}</Heading>,
  h3: (props) => <Heading level={3}>{props.children}</Heading>,
  h4: (props) => <Heading level={4}>{props.children}</Heading>,
  h5: (props) => <Heading level={5}>{props.children}</Heading>,
  h6: (props) => <Heading level={6}>{props.children}</Heading>,
  pre: (props) => <>{props.children}</>,
  code: (props) => {
    const lang = (props.className ?? "").match(/language-([\w-]+)/)?.[1];
    // Fenced code blocks get a language class; bare `code` is inline code.
    if (!lang) return <code className="doc-inline-code">{props.children}</code>;
    return <CodeBlock lang={lang}>{props.children}</CodeBlock>;
  },
  table: (props) => (
    <div className="doc-table-wrap">
      <table>{props.children}</table>
    </div>
  ),
  blockquote: (props) => <blockquote className="doc-blockquote">{props.children}</blockquote>,
};

export function renderMarkdown(markdown: string) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkDirective, admonitionRemarkPlugin]}
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {markdown}
    </ReactMarkdown>
  );
}

/** useMemo wrapper for preprocessed content. */
export function useRenderedDoc(preprocessed: string) {
  return useMemo(() => renderMarkdown(preprocessed), [preprocessed]);
}
