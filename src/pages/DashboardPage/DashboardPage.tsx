import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { formatCurrency } from "@/language";

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
  const { t, i18n } = useTranslation();

  const [retryCount, setRetryCount] = useState(0);

  const { products, loading, error } = useDashboardProducts(retryCount);

  const { totalInventoryValue, lowStockItems, averageRating } =
    useDashboardKpis(products);

  const stockValueByCategory = useStockValueByCategory(products);

  const language =
    i18n.language === "fr" ? "fr" : i18n.language === "de" ? "de" : "en";

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  return (
    <Box className={styles.page}>
      <Box className={styles.container}>
        <Box className={styles.header}>
          <h1 className={styles.title}>{t("dashboard.title")}</h1>

          <p className={styles.subtitle}>{t("dashboard.subtitle")}</p>
        </Box>

        {loading ? (
          <DashboardLoadingState />
        ) : error ? (
          <DashboardErrorState onRetry={handleRetry} />
        ) : (
          <>
            <Box className={styles.kpiGrid}>
              <DashboardKpiCard
                title={t("dashboard.inventoryValue.title")}
                value={formatCurrency(totalInventoryValue, language)}
                description={t("dashboard.inventoryValue.description")}
              />

              <DashboardKpiCard
                title={t("dashboard.lowStock.title")}
                value={lowStockItems.toString()}
                description={t("dashboard.lowStock.description")}
              />

              <DashboardKpiCard
                title={t("dashboard.averageRating.title")}
                value={averageRating.toFixed(1)}
                description={t("dashboard.averageRating.description")}
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
