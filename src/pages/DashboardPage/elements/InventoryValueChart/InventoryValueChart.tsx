import { useMemo } from "react";

import { Box, Typography } from "@mui/material";

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
  const maxValue = useMemo(() => {
    return Math.max(...data.map((item) => item.value), 0);
  }, [data]);

  const chartHeight = Math.max(data.length * ROW_HEIGHT, MIN_CHART_HEIGHT);

  const availableBarWidth = CHART_WIDTH - LEFT_PADDING - RIGHT_PADDING;

  if (data.length === 0) {
    return (
      <Box className={styles.empty}>
        <Typography variant="body2" color="text.secondary">
          No inventory data available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.header}>
        <Box>
          <Typography variant="h6" className={styles.title}>
            Stock Value by Category
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Inventory value based on price × stock
          </Typography>
        </Box>
      </Box>

      <Box className={styles.chartWrapper}>
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${chartHeight}`}
          className={styles.chart}
          role="img"
          aria-label="Stock value by category"
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
                  $
                  {item.value.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </text>
              </g>
            );
          })}
        </svg>
      </Box>
    </Box>
  );
};
