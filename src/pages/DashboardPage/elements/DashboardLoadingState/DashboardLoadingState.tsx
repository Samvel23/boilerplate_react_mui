import { Box, Skeleton } from "@mui/material";

import styles from "./DashboardLoadingState.module.scss";

export const DashboardLoadingState = () => {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.kpiGrid}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index} className={styles.card}>
            <Skeleton variant="text" width="55%" height={24} />

            <Skeleton variant="text" width="70%" height={48} />

            <Skeleton variant="text" width="80%" height={20} />
          </Box>
        ))}
      </Box>

      <Box className={styles.chart}>
        <Skeleton variant="text" width="35%" height={32} />

        <Skeleton variant="text" width="55%" height={24} />

        <Skeleton
          variant="rectangular"
          height={280}
          className={styles.chartSkeleton}
        />
      </Box>
    </Box>
  );
};
