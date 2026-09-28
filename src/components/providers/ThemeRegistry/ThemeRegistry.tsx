import { useMemo, type ReactNode } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { useThemeMode } from "@/hooks";
import { createAppTheme } from "@/theme/theme";

interface ThemeRegistryProps {
  children: ReactNode;
}

export const ThemeRegistry = ({ children }: ThemeRegistryProps) => {
  const { mode } = useThemeMode();

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
