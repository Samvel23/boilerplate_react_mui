import { useState } from "react";

import { Box, Typography } from "@mui/material";

import {
  DashboardErrorState,
  DashboardKpiCard,
  DashboardLoadingState,
  InventoryValueChart,
} from "./elements";

import {
  useDashboardKpis,
  useDashboardProducts,
  useStockValueByCategory,
} from "./hooks";

import styles from "./DashboardPage.module.scss";

export const DashboardPage = () => {
  const [retryCount, setRetryCount] = useState(0);

  const { products, loading, error } = useDashboardProducts(retryCount);

  const { totalInventoryValue, lowStockItems, averageRating } =
    useDashboardKpis(products);

  const stockValueByCategory = useStockValueByCategory(products);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  return (
    <Box className={styles.page}>
      <Box className={styles.container}>
        <Box className={styles.header}>
          <Typography variant="h4" className={styles.title}>
            Dashboard
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.subtitle}
          >
            Overview of your product inventory
          </Typography>
        </Box>

        {loading ? (
          <DashboardLoadingState />
        ) : error ? (
          <DashboardErrorState onRetry={handleRetry} />
        ) : (
          <>
            <Box className={styles.kpiGrid}>
              <DashboardKpiCard
                title="Total inventory value"
                value={`$${totalInventoryValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
                description="Current value of all inventory"
              />

              <DashboardKpiCard
                title="Low-stock items"
                value={lowStockItems.toString()}
                description="Products with stock under 10"
              />

              <DashboardKpiCard
                title="Average rating"
                value={averageRating.toFixed(1)}
                description="Average rating across products"
              />
            </Box>

            <Box className={styles.chartSection}>
              <InventoryValueChart data={stockValueByCategory} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
