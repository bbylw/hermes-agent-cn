import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { DocMeta } from "../content/docs";
import { getAdjacentDocs, getDocBreadcrumbs, loadDoc, preprocessMarkdown } from "../content/docs";
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

function ArrowUpIcon() {
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
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
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

  const breadcrumbs = useMemo(() => getDocBreadcrumbs(id), [id]);
  const adjacent = useMemo(() => getAdjacentDocs(id), [id]);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <nav className="doc-breadcrumbs" aria-label="文档路径">
          {breadcrumbs.map((b, idx) => (
            <span key={idx} className="doc-breadcrumb-item">
              {idx > 0 && <span className="doc-breadcrumb-sep">/</span>}
              {b.to && idx < breadcrumbs.length - 1 ? (
                <Link to={b.to}>{b.label}</Link>
              ) : (
                <span className="doc-breadcrumb-current">{b.label}</span>
              )}
            </span>
          ))}
        </nav>
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
      <nav className="doc-breadcrumbs" aria-label="文档路径">
        {breadcrumbs.map((b, idx) => (
          <span key={idx} className="doc-breadcrumb-item">
            {idx > 0 && <span className="doc-breadcrumb-sep">/</span>}
            {b.to && idx < breadcrumbs.length - 1 ? (
              <Link to={b.to}>{b.label}</Link>
            ) : (
              <span className="doc-breadcrumb-current">{b.label}</span>
            )}
          </span>
        ))}
      </nav>

      {!hasH1 && meta?.title && <h1 className="doc-title">{meta.title}</h1>}
      {!hasH1 && meta?.description && <p className="doc-description">{meta.description}</p>}

      <div className="doc-content">{rendered}</div>

      {(adjacent.prev || adjacent.next) && (
        <div className="doc-pagination">
          {adjacent.prev ? (
            <Link to={`/docs/${adjacent.prev.id}`} className="doc-page-card prev">
              <span className="doc-page-card-dir">← 上一篇</span>
              <span className="doc-page-card-title">{adjacent.prev.title}</span>
            </Link>
          ) : (
            <div className="doc-page-card-placeholder" />
          )}
          {adjacent.next ? (
            <Link to={`/docs/${adjacent.next.id}`} className="doc-page-card next">
              <span className="doc-page-card-dir">下一篇 →</span>
              <span className="doc-page-card-title">{adjacent.next.title}</span>
            </Link>
          ) : (
            <div className="doc-page-card-placeholder" />
          )}
        </div>
      )}

      <footer className="doc-footer">
        <div className="doc-footer-left">
          <a href={external} target="_blank" rel="noopener noreferrer">
            在完整文档站查看此页 ↗
          </a>
          <span className="doc-footer-sep">·</span>
          <Link to="/docs">返回文档首页</Link>
        </div>
        <button
          type="button"
          className="doc-back-to-top"
          onClick={scrollToTop}
          aria-label="回到顶部"
        >
          <ArrowUpIcon />
          回到顶部
        </button>
      </footer>
    </article>
  );
}
