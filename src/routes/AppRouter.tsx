import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

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

export const AppRouter = () => {
  return (
    <Suspense fallback={<RouteLoading />}>
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
        </Route>

        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </Suspense>
  );
};
