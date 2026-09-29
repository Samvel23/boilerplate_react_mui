import { useMemo } from "react";

import { Box, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import { formatCurrency, getCurrentLanguage } from "@/language";

import type { IStockValueByCategory } from "../../hooks";

import styles from "./InventoryValueChart.module.scss";

interface IInventoryValueChartProps {
  data: IStockValueByCategory[];
}

const CHART_WIDTH = 900;
const ROW_HEIGHT = 52;
const MIN_CHART_HEIGHT = 320;

const LEFT_PADDING = 180;
const RIGHT_PADDING = 120;
const BAR_HEIGHT = 26;

export const InventoryValueChart = ({ data }: IInventoryValueChartProps) => {
  const { t } = useTranslation();

  const language = getCurrentLanguage();

  const maxValue = useMemo(() => {
    return Math.max(...data.map((item) => item.value), 0);
  }, [data]);

  const chartHeight = Math.max(data.length * ROW_HEIGHT, MIN_CHART_HEIGHT);

  const availableBarWidth = CHART_WIDTH - LEFT_PADDING - RIGHT_PADDING;

  if (data.length === 0) {
    return (
      <Box className={styles.empty}>
        <Typography variant="body2" color="text.secondary">
          {t("dashboard.chart.empty")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.header}>
        <Box>
          <Typography variant="h6" className={styles.title}>
            {t("dashboard.chart.title")}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t("dashboard.chart.subtitle")}
          </Typography>
        </Box>
      </Box>

      <Box className={styles.chartWrapper}>
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${chartHeight}`}
          className={styles.chart}
          role="img"
          aria-label={t("dashboard.chart.ariaLabel")}
        >
          {data.map((item, index) => {
            const y = index * ROW_HEIGHT + ROW_HEIGHT / 2;

            const barWidth =
              maxValue > 0 ? (item.value / maxValue) * availableBarWidth : 0;

            const valueX = LEFT_PADDING + barWidth + 12;

            return (
              <g key={item.category}>
                <text
                  x={LEFT_PADDING - 16}
                  y={y + 5}
                  textAnchor="end"
                  className={styles.label}
                >
                  {item.category}
                </text>

                <rect
                  x={LEFT_PADDING}
                  y={y - BAR_HEIGHT / 2}
                  width={availableBarWidth}
                  height={BAR_HEIGHT}
                  rx={6}
                  className={styles.track}
                />

                <rect
                  x={LEFT_PADDING}
                  y={y - BAR_HEIGHT / 2}
                  width={barWidth}
                  height={BAR_HEIGHT}
                  rx={6}
                  className={styles.bar}
                />

                <text x={valueX} y={y + 5} className={styles.value}>
                  {formatCurrency(item.value, language)}
                </text>
              </g>
            );
          })}
        </svg>
      </Box>
    </Box>
  );
};
