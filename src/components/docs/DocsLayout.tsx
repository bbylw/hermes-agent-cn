import { Outlet, useLocation } from "react-router-dom";
import { useMemo } from "react";
import Nav from "../Nav";
import SiteFooter from "../SiteFooter";
import DocsSidebar, { DocsMobileSelect } from "./DocsSidebar";
import "../../docs.css";

export default function DocsLayout() {
  const location = useLocation();
  const activeId = useMemo(() => {
    const p = location.pathname.replace(/^\/docs\/?/, "").replace(/\/$/, "");
    return p || "index";
  }, [location.pathname]);

  return (
    <>
      <Nav />
      <div className="docs-shell">
        <div className="docs-wrap">
          <aside className="docs-aside">
            <DocsSidebar />
          </aside>
          <main className="docs-main" id="docs-main">
            <DocsMobileSelect activeId={activeId} />
            <Outlet />
          </main>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
