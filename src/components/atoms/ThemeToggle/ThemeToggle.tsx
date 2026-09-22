import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { AppIconButton } from "../IconButton";
import { useThemeMode } from "@/components";

export const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeMode();

  const isDarkMode = mode === "dark";

  return (
    <AppIconButton
      onClick={toggleMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </AppIconButton>
  );
};
