import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

/* Admin and the case-study page are split out of the initial bundle — a
   recruiter landing on the homepage never downloads them. */
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {!isAdmin && <Nav />}

      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!isAdmin && <Footer />}
    </>
  );
}

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <span className="route-fallback__bar" aria-hidden="true" />
    </div>
  );
}
