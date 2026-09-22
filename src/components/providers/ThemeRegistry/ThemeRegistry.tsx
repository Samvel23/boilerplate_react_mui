import type { ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { useThemeMode } from "../ThemeMode";
import { createAppTheme } from "@/theme/theme";

interface ThemeRegistryProps {
  children: ReactNode;
}

export const ThemeRegistry = ({ children }: ThemeRegistryProps) => {
  const { mode } = useThemeMode();

  const theme = createAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
