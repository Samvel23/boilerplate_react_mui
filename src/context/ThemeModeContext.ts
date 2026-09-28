import { createContext } from "react";

import type { TThemeMode } from "@/theme/theme";

interface IThemeModeContextValue {
  mode: TThemeMode;
  toggleMode: VoidFunction;
}

export const ThemeModeContext = createContext<
  IThemeModeContextValue | undefined
>(undefined);
