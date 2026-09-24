import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ThemeModeProvider, ThemeRegistry } from "@/components";
import App from "./App";

import "./language/i18n";
import "@/styles/globals.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeModeProvider>
        <ThemeRegistry>
          <App />
        </ThemeRegistry>
      </ThemeModeProvider>
    </BrowserRouter>
  </StrictMode>,
);
