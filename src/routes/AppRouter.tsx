import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Shell } from "@/components";
import { LoginPage } from "@/pages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Shell title="React MUI Boilerplate">
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
};
