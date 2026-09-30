import { useState } from "react";

import { Menu, MenuItem } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

import { useTranslation } from "react-i18next";

import { useThemeMode } from "@/hooks";

import { IconButton } from "../IconButton";

import { themeModes, type TThemeMode } from "@/theme/theme";

export const ThemeToggle = () => {
  const { t } = useTranslation();

  const { mode, changeMode } = useThemeMode();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = (nextMode: TThemeMode) => {
    changeMode(nextMode);
    setAnchorEl(null);
  };

  const getThemeIcon = () => {
    if (mode === themeModes.light) {
      return <LightModeIcon />;
    }

    if (mode === themeModes.dark) {
      return <DarkModeIcon />;
    }

    return <SettingsBrightnessIcon />;
  };

  const getAriaLabel = () => {
    if (mode === themeModes.light) {
      return t("theme.light");
    }

    if (mode === themeModes.dark) {
      return t("theme.dark");
    }

    return t("theme.system");
  };

  return (
    <>
      <IconButton
        type="button"
        onClick={handleOpen}
        aria-label={getAriaLabel()}
        aria-controls={menuOpen ? "theme-mode-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
      >
        {getThemeIcon()}
      </IconButton>

      <Menu
        id="theme-mode-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
      >
        <MenuItem
          selected={mode === themeModes.light}
          onClick={() => handleModeChange(themeModes.light)}
        >
          <LightModeIcon fontSize="small" />
          {t("theme.light")}
        </MenuItem>

        <MenuItem
          selected={mode === themeModes.dark}
          onClick={() => handleModeChange(themeModes.dark)}
        >
          <DarkModeIcon fontSize="small" />
          {t("theme.dark")}
        </MenuItem>

        <MenuItem
          selected={mode === themeModes.system}
          onClick={() => handleModeChange(themeModes.system)}
        >
          <SettingsBrightnessIcon fontSize="small" />
          {t("theme.system")}
        </MenuItem>
      </Menu>
    </>
  );
};
