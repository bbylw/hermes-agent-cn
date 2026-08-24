import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { DocMeta } from "../content/docs";
import { loadDoc, preprocessMarkdown } from "../content/docs";
import { useRenderedDoc } from "../lib/markdown";

function NotFound({ id }: { id: string }) {
  return (
    <div className="doc-notfound">
      <div className="doc-notfound-code">404</div>
      <h1>页面不存在</h1>
      <p>
        文档「{id}」未收录在本站。它可能只有英文版本：
        <a
          href={`https://hermes-agent.nousresearch.com/docs/zh-Hans/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          在完整文档站查看 →
        </a>
      </p>
      <Link className="btn btn-ghost" to="/docs">
        返回文档首页
      </Link>
    </div>
  );
}

function Loading() {
  return (
    <div className="doc-loading" aria-label="加载中">
      <span />
    </div>
  );
}

export default function DocsPage() {
  const params = useParams();
  const id = useMemo(() => {
    const full = [params.id, params["*"]].filter(Boolean).join("/");
    return full || "index";
  }, [params.id, params["*"]]);

  const [raw, setRaw] = useState<string | null>(null);
  const [meta, setMeta] = useState<DocMeta | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    setRaw(null);
    loadDoc(id).then((doc) => {
      if (cancelled) return;
      if (!doc) {
        setState("missing");
      } else {
        setRaw(doc.raw);
        setMeta(doc.meta);
        setState("ready");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const body = useMemo(() => (raw == null ? null : preprocessMarkdown(raw, id)), [raw, id]);
  const rendered = useRenderedDoc(body ?? "");

  if (state === "missing") return <NotFound id={id} />;
  if (state === "loading" || body == null) return <Loading />;

  // If the markdown starts with a top-level heading, don't duplicate it.
  const hasH1 = /^#\s+\S/.test(body.trim());
  const external = `https://hermes-agent.nousresearch.com/docs/zh-Hans/${id}`;

  // Some pages (e.g. user-stories) consist only of a JSX component we can't
  // replicate — show a friendly placeholder pointing at the live docs site.
  if (!body.trim()) {
    return (
      <article className="doc-article">
        <h1 className="doc-title">{meta?.title ?? id}</h1>
        {meta?.description && <p className="doc-description">{meta.description}</p>}
        <div className="doc-empty">
          <p>此页面的主体内容是交互动效，未能完整复刻到本站。</p>
          <a className="btn btn-primary" href={external} target="_blank" rel="noopener noreferrer">
            在完整文档站查看
          </a>
        </div>
      </article>
    );
  }

  return (
    <article className="doc-article">
      {!hasH1 && meta?.title && <h1 className="doc-title">{meta.title}</h1>}
      {!hasH1 && meta?.description && <p className="doc-description">{meta.description}</p>}
      <div className="doc-content">{rendered}</div>
      <footer className="doc-footer">
        <a href={external} target="_blank" rel="noopener noreferrer">
          在完整文档站查看此页 ↗
        </a>
        <Link to="/docs">返回文档首页</Link>
      </footer>
    </article>
  );
}
