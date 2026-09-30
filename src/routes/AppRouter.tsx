
import { lazy, Suspense, useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Shell } from "@/components";

import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { RouteLoading } from "./RouteLoading";

const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);

const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage").then((module) => ({
    default: module.DashboardPage,
  })),
);

const ProductsPage = lazy(() =>
  import("@/pages/ProductsPage").then((module) => ({
    default: module.ProductsPage,
  })),
);

const CreateProductPage = lazy(() =>
  import("@/pages/CreateProductPage").then((module) => ({
    default: module.CreateProductPage,
  })),
);

const ProductDetailsPage = lazy(() =>
  import("@/pages/ProductDetailsPage").then((module) => ({
    default: module.ProductDetailsPage,
  })),
);

const RouteFocus = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const initialLocationKey = useRef(location.key);

  useEffect(() => {
    if (location.key === initialLocationKey.current) {
      return;
    }

    initialLocationKey.current = location.key;

    const frameId = requestAnimationFrame(() => {
      containerRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [location.key]);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      style={{ outline: "none" }}
    >
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Shell />}>
            <Route path="/" element={<DashboardPage />} />

            <Route path="/products" element={<ProductsPage />} />

            <Route path="/products/new" element={<CreateProductPage />} />

            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/products" replace />} />
        </Route>
      </Routes>
    </div>
  );
};

export const AppRouter = () => {
  return (
    <Suspense fallback={<RouteLoading />}>
      <RouteFocus />
    </Suspense>
  );
};
