import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./Landing";

// Docs are code-split so the landing page stays lightweight.
const DocsLayout = lazy(() => import("./components/docs/DocsLayout"));
const DocsPage = lazy(() => import("./pages/DocsPage"));

/** On route change: scroll to the hash target, or back to the top. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Suspense fallback={<div className="route-loading" />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocsPage />} />
            <Route path=":id/*" element={<DocsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
