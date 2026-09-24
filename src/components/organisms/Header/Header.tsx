import { useState } from "react";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@/stores/useUserStore";

import styles from "./Header.module.scss";

export const Header = () => {
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const removeCredentials = useUserStore((state) => state.removeCredentials);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  if (!user) {
    return null;
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeCredentials();
    handleMenuClose();

    navigate("/login", { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.user}>
        <Typography variant="body1">{fullName}</Typography>

        <Avatar
          src={user.image}
          alt={fullName}
          onClick={handleMenuOpen}
          className={styles.avatar}
        />
      </div>

      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </header>
  );
};
