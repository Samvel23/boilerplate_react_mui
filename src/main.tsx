import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ThemeModeProvider, ThemeRegistry } from "@/components";
import App from "./App";

import "@/language";
import "@/styles/globals.scss";
import { ToastProvider } from "./components/providers/ToastProvider";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeModeProvider>
      <ThemeRegistry>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeRegistry>
    </ThemeModeProvider>
  </BrowserRouter>,
);
