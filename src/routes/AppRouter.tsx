import { Navigate, Route, Routes } from "react-router-dom";

import { Shell } from "@/components";
import { ProductDetailsPage } from "@/pages";
import { LoginPage, ProductsPage } from "@/pages";

import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<Shell />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/products" element={<ProductsPage />} />
        </Route>
      </Route>

      <Route path="/products/:id" element={<ProductDetailsPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
