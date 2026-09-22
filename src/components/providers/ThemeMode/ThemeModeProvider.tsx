import {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";

import type { TThemeMode } from "@/theme/theme";

interface IThemeModeContextValue {
  mode: TThemeMode;
  toggleMode: VoidFunction;
}

const ThemeModeContext = createContext<IThemeModeContextValue | undefined>(
  undefined,
);

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

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }

  return context;
}
