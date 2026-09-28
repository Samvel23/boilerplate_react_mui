import { Button, TableCell, TableRow, Typography } from "@mui/material";

import styles from "./ProductErrorState.module.scss";

interface ProductErrorStateProps {
  onRetry: () => void;
}

export const ProductErrorState = ({ onRetry }: ProductErrorStateProps) => {
  return (
    <TableRow>
      <TableCell colSpan={6} className={styles.cell}>
        <Typography variant="body1" className={styles.title}>
          Failed to load products
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.description}
        >
          Something went wrong while loading the products. Please try again.
        </Typography>

        <Button variant="outlined" onClick={onRetry} className={styles.button}>
          Retry loading
        </Button>
      </TableCell>
    </TableRow>
  );
};
