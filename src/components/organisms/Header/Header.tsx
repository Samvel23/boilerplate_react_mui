import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { useUserStore } from "@/stores/useUserStore";

import styles from "./Header.module.scss";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const removeCredentials = useUserStore((state) => state.removeCredentials);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);

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
            Inventory
          </Button>

          <Box className={styles.navigation}>
            <Button
              type="button"
              variant={isHomePage ? "contained" : "text"}
              onClick={handleHomeNavigation}
            >
              Home
            </Button>

            <Button
              type="button"
              variant={isProductsPage ? "contained" : "text"}
              onClick={handleProductsNavigation}
            >
              Products
            </Button>

            <Button
              type="button"
              variant={isCreatePage ? "contained" : "text"}
              onClick={handleCreateNavigation}
            >
              Create product
            </Button>
          </Box>
        </Box>

        <Box className={styles.right}>
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
            <MenuItem onClick={handleHomeNavigation}>Home</MenuItem>

            <MenuItem onClick={handleProductsNavigation}>Products</MenuItem>

            <MenuItem onClick={handleCreateNavigation}>Create product</MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
