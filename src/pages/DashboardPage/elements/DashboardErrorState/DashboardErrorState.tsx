import { Box, Button, Typography } from "@mui/material";

import styles from "./DashboardErrorState.module.scss";

interface DashboardErrorStateProps {
  onRetry: () => void;
}

export const DashboardErrorState = ({ onRetry }: DashboardErrorStateProps) => {
  return (
    <Box className={styles.wrapper}>
      <Typography variant="h6" className={styles.title}>
        Unable to load dashboard
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        className={styles.message}
      >
        We couldn't load the inventory data. Please try again.
      </Typography>

      <Button type="button" variant="contained" onClick={onRetry}>
        Try again
      </Button>
    </Box>
  );
};
