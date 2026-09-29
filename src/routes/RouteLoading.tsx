import { Box, CircularProgress } from "@mui/material";

import styles from "./RouteLoading.module.scss";

export const RouteLoading = () => {
  return (
    <Box
      className={styles.container}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <CircularProgress />
    </Box>
  );
};
