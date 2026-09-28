import { TableCell, TableRow, Typography } from "@mui/material";

import styles from "./ProductEmptyState.module.scss";

export const ProductEmptyState = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} className={styles.cell}>
        <Typography variant="body1" className={styles.title}>
          No products found
        </Typography>

        <Typography variant="body2" color="text.secondary">
          There are no products matching your current filters.
        </Typography>
      </TableCell>
    </TableRow>
  );
};
