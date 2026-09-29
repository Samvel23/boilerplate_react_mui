import type { TThemeMode } from "@/theme/theme";
import { createContext } from "react";

interface IThemeModeContextValue {
  mode: TThemeMode;
  toggleMode: VoidFunction;
}

export const ThemeModeContext = createContext<
  IThemeModeContextValue | undefined
>(undefined);
