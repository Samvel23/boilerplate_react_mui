import { Box, Button, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import styles from "./DashboardErrorState.module.scss";

interface IDashboardErrorStateProps {
  onRetry: VoidFunction;
}

export const DashboardErrorState = ({ onRetry }: IDashboardErrorStateProps) => {
  const { t } = useTranslation();

  return (
    <Box className={styles.wrapper}>
      <Typography variant="h6" className={styles.title}>
        {t("dashboard.error.title")}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        className={styles.message}
      >
        {t("dashboard.error.message")}
      </Typography>

      <Button type="button" variant="contained" onClick={onRetry}>
        {t("actions.tryAgain")}
      </Button>
    </Box>
  );
};
