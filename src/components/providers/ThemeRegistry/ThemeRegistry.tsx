import { useMemo, type ReactNode } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { useThemeMode } from "@/hooks";

import { createAppTheme } from "@/theme/theme";

interface ThemeRegistryProps {
  children: ReactNode;
}

export const ThemeRegistry = ({ children }: ThemeRegistryProps) => {
  const { resolvedMode } = useThemeMode();

  const theme = useMemo(() => createAppTheme(resolvedMode), [resolvedMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
