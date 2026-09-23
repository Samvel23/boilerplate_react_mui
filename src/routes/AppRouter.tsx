import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Shell } from "@/components";
import { LoginPage } from "@/pages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
};
