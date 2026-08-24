import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { NavCategory, NavNode } from "../../content/docs";
import { docsNav } from "../../content/docs";

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

function DocItem({ node }: { node: NavNode & { type: "doc" } }) {
  const location = useLocation();
  const active = location.pathname === `/docs/${node.id}`;
  if (node.zh) {
    return (
      <Link className={active ? "docs-link active" : "docs-link"} to={`/docs/${node.id}`}>
        {node.title ?? node.id}
      </Link>
    );
  }
  return (
    <a
      className="docs-link docs-ext"
      href={`https://hermes-agent.nousresearch.com/docs/zh-Hans/${node.id}`}
      target="_blank"
      rel="noopener noreferrer"
      title="英文文档（站外）"
    >
      {node.title ?? node.id}
      <ExternalIcon />
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
      <div className="docs-sidebar-item" style={{ paddingLeft: `${12 + depth * 14}px` }}>
        <DocItem node={node} />
      </div>
    );
  }
  const cat = node as NavCategory;
  const expanded = open.has(key);
  return (
    <div className="docs-sidebar-cat">
      <button
        type="button"
        className="docs-cat-btn"
        style={{ paddingLeft: `${10 + depth * 14}px` }}
        aria-expanded={expanded}
        onClick={() => onToggle(key)}
      >
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
        {cat.label}
      </button>
      {expanded && (
        <div className="docs-cat-items">
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
  const activeId = useMemo(() => {
    const p = location.pathname.replace(/^\/docs\/?/, "").replace(/\/$/, "");
    return p || "index";
  }, [location.pathname]);

  const [open, setOpen] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const keys: string[] = [];
    docsNav.forEach((node, i) => {
      const r = ancestorTrails([node], activeId, [String(i)]);
      if (r.length) keys.push(...r);
    });
    setOpen(new Set(keys));
  }, [activeId]);

  const toggle = (key: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <nav className="docs-sidebar" aria-label="文档导航">
      <div className="docs-sidebar-head">
        <span className="docs-sidebar-title">文档目录</span>
        <a
          className="docs-sidebar-home"
          href="https://hermes-agent.nousresearch.com/docs/zh-Hans/"
          target="_blank"
          rel="noopener noreferrer"
          title="前往完整文档站"
        >
          完整文档站
          <ExternalIcon />
        </a>
      </div>
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
    </nav>
  );
}

/** Flat list of all zh docs for the mobile select. */
export function flatZhDocs(): { id: string; title: string; group: string }[] {
  const out: { id: string; title: string; group: string }[] = [];
  const walk = (nodes: NavNode[], group: string) => {
    for (const node of nodes) {
      if (node.type === "doc") {
        if (node.zh) out.push({ id: node.id, title: node.title ?? node.id, group });
      } else {
        walk(node.items, group ? `${group} / ${node.label}` : node.label);
      }
    }
  };
  walk(docsNav, "");
  return out;
}

export function DocsMobileSelect({ activeId }: { activeId: string }) {
  const docs = flatZhDocs();
  return (
    <select
      className="docs-mobile-select"
      aria-label="选择文档页面"
      value={activeId}
      onChange={(e) => {
        window.location.href = `/docs/${e.target.value}`;
      }}
    >
      {docs.map((d) => (
        <option key={d.id} value={d.id}>
          {d.group ? `${d.group} — ${d.title}` : d.title}
        </option>
      ))}
    </select>
  );
}
