import { Box, Typography } from "@mui/material";

import styles from "./DashboardKpiCard.module.scss";

interface DashboardKpiCardProps {
  title: string;
  value: string;
  description: string;
}

export const DashboardKpiCard = ({
  title,
  value,
  description,
}: DashboardKpiCardProps) => {
  return (
    <Box className={styles.card}>
      <Typography
        variant="body2"
        color="text.secondary"
        className={styles.title}
      >
        {title}
      </Typography>

      <Typography variant="h4" className={styles.value}>
        {value}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        className={styles.description}
      >
        {description}
      </Typography>
    </Box>
  );
};
