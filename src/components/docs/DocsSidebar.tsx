import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { NavCategory, NavNode } from "../../content/docs";
import { docsNav, flattenNavDocs } from "../../content/docs";

function ExternalIcon() {
  return (
    <svg
      className="docs-ext-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="docs-search-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ClearIcon() {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function DocItem({ node }: { node: NavNode & { type: "doc" } }) {
  const location = useLocation();
  const active = location.pathname === `/docs/${node.id}`;
  if (node.zh) {
    return (
      <Link className={active ? "docs-link active" : "docs-link"} to={`/docs/${node.id}`}>
        <span className="docs-link-text">{node.title ?? node.id}</span>
        {active && <span className="docs-link-active-dot" aria-hidden="true" />}
      </Link>
    );
  }
  return (
    <a
      className="docs-link docs-ext"
      href={`https://hermes-agent.nousresearch.com/docs/zh-Hans/${node.id}`}
      target="_blank"
      rel="noopener noreferrer"
      title="英文原版文档（站外）"
    >
      <span className="docs-link-text">{node.title ?? node.id}</span>
      <span className="docs-ext-badge">
        EN
        <ExternalIcon />
      </span>
    </a>
  );
}

function NodeView({
  node,
  open,
  onToggle,
  trail,
  depth,
}: {
  node: NavNode;
  open: Set<string>;
  onToggle: (key: string) => void;
  trail: string[];
  depth: number;
}) {
  const key = trail.join("/");
  if (node.type === "doc") {
    return (
      <div className={`docs-sidebar-item depth-${depth}`}>
        <DocItem node={node} />
      </div>
    );
  }
  const cat = node as NavCategory;
  const expanded = open.has(key);
  const isTopLevel = depth === 0;

  return (
    <div className={`docs-sidebar-cat${isTopLevel ? " top-level" : ""}`}>
      <button
        type="button"
        className={`docs-cat-btn${expanded ? " open" : ""}${isTopLevel ? " is-root" : ""}`}
        aria-expanded={expanded}
        onClick={() => onToggle(key)}
      >
        <span className="docs-cat-title">{cat.label}</span>
        <svg
          className={`docs-cat-chevron${expanded ? " open" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {expanded && (
        <div className={`docs-cat-items depth-${depth + 1}`}>
          {cat.items.map((child, i) => (
            <NodeView
              key={`${key}/${i}`}
              node={child}
              open={open}
              onToggle={onToggle}
              trail={[...trail, cat.label]}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Collects the trails of every category that contains the active doc. */
function ancestorTrails(nodes: NavNode[], id: string, trail: string[]): string[] {
  const found: string[] = [];
  for (const node of nodes) {
    if (node.type === "doc") {
      if (node.id === id) found.push(trail.join("/"));
    } else {
      const r = ancestorTrails(node.items, id, [...trail, node.label]);
      if (r.length) found.push(trail.join("/"), ...r);
    }
  }
  return found;
}

export default function DocsSidebar() {
  const location = useLocation();
  const sidebarRef = useRef<HTMLElement>(null);
  const activeId = useMemo(() => {
    const p = location.pathname.replace(/^\/docs\/?/, "").replace(/\/$/, "");
    return p || "index";
  }, [location.pathname]);

  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const [query, setQuery] = useState("");

  const allDocs = useMemo(() => flattenNavDocs(docsNav), []);

  const filteredDocs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return allDocs.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.group.toLowerCase().includes(q),
    );
  }, [allDocs, query]);

  useEffect(() => {
    const keys: string[] = [];
    docsNav.forEach((node, i) => {
      const r = ancestorTrails([node], activeId, [String(i)]);
      if (r.length) keys.push(...r);
    });
    setOpen((prev) => new Set([...prev, ...keys]));
  }, [activeId]);

  useEffect(() => {
    if (query) return;
    const el = sidebarRef.current?.querySelector(".docs-link.active");
    if (el) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId, query]);

  const toggle = (key: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <nav className="docs-sidebar" ref={sidebarRef} aria-label="文档导航">
      <div className="docs-sidebar-head">
        <div className="docs-sidebar-badge">
          <span className="docs-sidebar-dot" />
          <span>文档中心</span>
        </div>
        <a
          className="docs-sidebar-home"
          href="https://hermes-agent.nousresearch.com/docs/zh-Hans/"
          target="_blank"
          rel="noopener noreferrer"
          title="前往完整文档站"
        >
          全量站
          <ExternalIcon />
        </a>
      </div>

      <div className="docs-search-wrap">
        <SearchIcon />
        <input
          type="text"
          className="docs-search-input"
          placeholder="快速搜索 90+ 篇文档..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="快速查找文档"
        />
        {query && (
          <button
            type="button"
            className="docs-search-clear"
            onClick={() => setQuery("")}
            aria-label="清空搜索"
          >
            <ClearIcon />
          </button>
        )}
      </div>

      <div className="docs-sidebar-content">
        {filteredDocs !== null ? (
          <div className="docs-search-results">
            <div className="docs-search-count">找到 {filteredDocs.length} 篇相关文档</div>
            {filteredDocs.length === 0 ? (
              <div className="docs-search-empty">未找到匹配「{query}」的文档</div>
            ) : (
              filteredDocs.map((doc) => {
                const active = location.pathname === `/docs/${doc.id}`;
                if (doc.zh) {
                  return (
                    <Link
                      key={doc.id}
                      className={active ? "docs-search-item active" : "docs-search-item"}
                      to={`/docs/${doc.id}`}
                      onClick={() => setQuery("")}
                    >
                      <div className="docs-search-title">{doc.title}</div>
                      {doc.group && <div className="docs-search-group">{doc.group}</div>}
                    </Link>
                  );
                }
                return (
                  <a
                    key={doc.id}
                    className="docs-search-item docs-ext"
                    href={`https://hermes-agent.nousresearch.com/docs/zh-Hans/${doc.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setQuery("")}
                  >
                    <div className="docs-search-title">
                      {doc.title}
                      <span className="docs-ext-badge">
                        EN
                        <ExternalIcon />
                      </span>
                    </div>
                    {doc.group && <div className="docs-search-group">{doc.group}</div>}
                  </a>
                );
              })
            )}
          </div>
        ) : (
          <div className="docs-tree-root">
            {docsNav.map((node, i) => (
              <NodeView
                key={`top/${i}`}
                node={node}
                open={open}
                onToggle={toggle}
                trail={[String(i)]}
                depth={0}
              />
            ))}
          </div>
        )}
      </div>

      <div className="docs-sidebar-foot">
        <span className="docs-ver-tag">Hermes Agent v0.20.5</span>
        <span className="docs-license-tag">MIT 开源</span>
      </div>
    </nav>
  );
}

/** Flat list of all zh docs for the mobile select. */
export function flatZhDocs(): { id: string; title: string; group: string }[] {
  return flattenNavDocs(docsNav).filter((d) => d.zh);
}

export function DocsMobileSelect({ activeId }: { activeId: string }) {
  const docs = flatZhDocs();
  const navigate = useNavigate();

  return (
    <div className="docs-mobile-select-wrap">
      <select
        className="docs-mobile-select"
        aria-label="选择文档页面"
        value={activeId}
        onChange={(e) => {
          navigate(`/docs/${e.target.value}`);
        }}
      >
        {docs.map((d) => (
          <option key={d.id} value={d.id}>
            {d.group ? `${d.group} — ${d.title}` : d.title}
          </option>
        ))}
      </select>
    </div>
  );
}
