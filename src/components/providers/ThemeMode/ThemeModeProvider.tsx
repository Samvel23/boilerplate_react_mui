import { useCallback, useMemo, useState, type ReactNode } from "react";

import { ThemeModeContext } from "@/context";
import type { TThemeMode } from "@/theme/theme";

interface IThemeModeProviderProps {
  children: ReactNode;
}

const THEME_MODE_KEY = "theme-mode";

const getInitialMode = (): TThemeMode => {
  const savedMode = localStorage.getItem(THEME_MODE_KEY);

  if (savedMode === "light" || savedMode === "dark") {
    return savedMode;
  }

  return "light";
};

export const ThemeModeProvider = ({ children }: IThemeModeProviderProps) => {
  const [mode, setMode] = useState<TThemeMode>(getInitialMode);

  const toggleMode = useCallback(() => {
    setMode((currentMode) => {
      const nextMode = currentMode === "light" ? "dark" : "light";

      localStorage.setItem(THEME_MODE_KEY, nextMode);

      return nextMode;
    });
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
