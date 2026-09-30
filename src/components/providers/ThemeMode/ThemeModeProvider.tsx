import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

import {
  themeModes,
  type TThemeMode,
  type TResolvedThemeMode,
} from "@/theme/theme";
import { ThemeModeContext } from "@/context";

interface IThemeModeProviderProps {
  children: ReactNode;
}

const THEME_MODE_KEY = "theme-mode";

const getInitialMode = (): TThemeMode => {
  const savedMode = localStorage.getItem(THEME_MODE_KEY);

  if (
    savedMode === themeModes.light ||
    savedMode === themeModes.dark ||
    savedMode === themeModes.system
  ) {
    return savedMode;
  }

  return themeModes.system;
};

const getSystemMode = (): TResolvedThemeMode => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeModeProvider = ({ children }: IThemeModeProviderProps) => {
  const [mode, setMode] = useState<TThemeMode>(getInitialMode);

  const [systemMode, setSystemMode] =
    useState<TResolvedThemeMode>(getSystemMode);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemModeChange = (event: MediaQueryListEvent) => {
      setSystemMode(event.matches ? "dark" : "light");
    };

    setSystemMode(mediaQuery.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleSystemModeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemModeChange);
    };
  }, []);

  const resolvedMode: TResolvedThemeMode =
    mode === themeModes.system ? systemMode : mode;

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedMode;
    document.documentElement.style.colorScheme = resolvedMode;
  }, [resolvedMode]);

  const changeMode = useCallback((nextMode: TThemeMode) => {
    localStorage.setItem(THEME_MODE_KEY, nextMode);

    setMode(nextMode);
  }, []);

  const toggleMode = useCallback(() => {
    setMode((currentMode) => {
      const nextMode =
        currentMode === themeModes.dark ? themeModes.light : themeModes.dark;

      localStorage.setItem(THEME_MODE_KEY, nextMode);

      return nextMode;
    });
  }, []);

  const value = useMemo(
    () => ({
      mode,
      resolvedMode,
      changeMode,
      toggleMode,
    }),
    [mode, resolvedMode, changeMode, toggleMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
};
