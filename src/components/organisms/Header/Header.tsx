import {
  AppBar,
  Box,
  Button,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { changeLanguage, getCurrentLanguage, type TLanguage } from "@/language";
import { useUserStore } from "@/stores/useUserStore";

import styles from "./Header.module.scss";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const removeCredentials = useUserStore((state) => state.removeCredentials);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedLanguage, setSelectedLanguage] =
    useState<TLanguage>(getCurrentLanguage());

  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    const handleLanguageChange = (language: string) => {
      if (language !== "en" && language !== "fr" && language !== "de") {
        return;
      }

      setSelectedLanguage(language);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHomeNavigation = () => {
    handleMenuClose();
    navigate("/");
  };

  const handleProductsNavigation = () => {
    handleMenuClose();
    navigate("/products");
  };

  const handleCreateNavigation = () => {
    handleMenuClose();
    navigate("/products/new");
  };

  const handleLogout = () => {
    handleMenuClose();
    removeCredentials();
    navigate("/login");
  };

  const handleLanguageChange = async (language: TLanguage) => {
    setSelectedLanguage(language);
    await changeLanguage(language);
  };

  const isHomePage = location.pathname === "/";

  const isProductsPage = location.pathname === "/products";

  const isCreatePage = location.pathname === "/products/new";

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className={styles.header}
    >
      <Toolbar className={styles.toolbar}>
        <Box className={styles.left}>
          <Button
            type="button"
            variant="text"
            onClick={handleHomeNavigation}
            className={styles.logo}
          >
            {t("appName")}
          </Button>

          <Box className={styles.navigation}>
            <Button
              type="button"
              variant={isHomePage ? "contained" : "text"}
              onClick={handleHomeNavigation}
            >
              {t("navigation.home")}
            </Button>

            <Button
              type="button"
              variant={isProductsPage ? "contained" : "text"}
              onClick={handleProductsNavigation}
            >
              {t("navigation.products")}
            </Button>

            <Button
              type="button"
              variant={isCreatePage ? "contained" : "text"}
              onClick={handleCreateNavigation}
            >
              {t("navigation.createProduct")}
            </Button>
          </Box>
        </Box>

        <Box className={styles.right}>
          <FormControl size="small" className={styles.languageSelect}>
            <Select
              value={selectedLanguage}
              onChange={(event) => {
                void handleLanguageChange(event.target.value as TLanguage);
              }}
              aria-label={t("language.label")}
              displayEmpty
            >
              <MenuItem value="en">{t("language.english")}</MenuItem>

              <MenuItem value="fr">{t("language.french")}</MenuItem>

              <MenuItem value="de">{t("language.german")}</MenuItem>
            </Select>
          </FormControl>

          <ThemeToggle />

          <IconButton
            type="button"
            onClick={handleMenuOpen}
            aria-label="Open user menu"
            aria-controls={menuOpen ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
          >
            <Typography component="span" className={styles.userIcon}>
              ⋮
            </Typography>
          </IconButton>

          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            className={styles.menu}
          >
            <MenuItem onClick={handleHomeNavigation}>
              {t("navigation.home")}
            </MenuItem>

            <MenuItem onClick={handleProductsNavigation}>
              {t("navigation.products")}
            </MenuItem>

            <MenuItem onClick={handleCreateNavigation}>
              {t("navigation.createProduct")}
            </MenuItem>

            <MenuItem onClick={handleLogout}>{t("navigation.logout")}</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
