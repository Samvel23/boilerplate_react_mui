import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  Box,
  Menu,
  AppBar,
  Select,
  Button,
  Toolbar,
  MenuItem,
  Typography,
  IconButton,
  FormControl,
} from "@mui/material";

import { useUserStore } from "@/stores/useUserStore";

import { ThemeToggle } from "@/components/atoms/ThemeToggle";

import { changeLanguage, getCurrentLanguage, type TLanguage } from "@/language";

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
      component="header"
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
            aria-label={t("appName")}
          >
            {t("appName")}
          </Button>

          <Box
            component="nav"
            aria-label={t("navigation.label")}
            className={styles.navigation}
          >
            <Button
              type="button"
              variant={isHomePage ? "contained" : "text"}
              onClick={handleHomeNavigation}
              aria-current={isHomePage ? "page" : undefined}
            >
              {t("navigation.home")}
            </Button>

            <Button
              type="button"
              variant={isProductsPage ? "contained" : "text"}
              onClick={handleProductsNavigation}
              aria-current={isProductsPage ? "page" : undefined}
            >
              {t("navigation.products")}
            </Button>

            <Button
              type="button"
              variant={isCreatePage ? "contained" : "text"}
              onClick={handleCreateNavigation}
              aria-current={isCreatePage ? "page" : undefined}
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
            aria-label={t("navigation.userMenu")}
            aria-controls={menuOpen ? "user-menu" : undefined}
            aria-haspopup="menu"
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
