import { useCallback, useState, useMemo, type ReactNode } from "react";

import type { TThemeMode } from "@/theme/theme";
import { ThemeModeContext } from "@/context";

interface IThemeModeProviderProps {
  children: ReactNode;
}

export const ThemeModeProvider = ({ children }: IThemeModeProviderProps) => {
  const [mode, setMode] = useState<TThemeMode>("light");

  const toggleMode = useCallback(() => {
    setMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({
      mode,
      toggleMode,
    }),
    [mode, toggleMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
};
