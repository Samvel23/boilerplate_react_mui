import { Navigate, Route, Routes } from "react-router-dom";

import {
  CreateProductPage,
  DashboardPage,
  LoginPage,
  ProductDetailsPage,
  ProductsPage,
} from "@/pages";

import { Shell } from "@/components";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
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
  );
};
