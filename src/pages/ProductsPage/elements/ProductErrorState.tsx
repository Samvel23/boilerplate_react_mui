import { Button, TableCell, TableRow, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import styles from "./ProductErrorState.module.scss";

interface ProductErrorStateProps {
  onRetry: () => void;
}

export const ProductErrorState = ({ onRetry }: ProductErrorStateProps) => {
  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell colSpan={6} className={styles.cell}>
        <Typography variant="body1" className={styles.title}>
          {t("productError.title")}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.description}
        >
          {t("productError.description")}
        </Typography>

        <Button variant="outlined" onClick={onRetry} className={styles.button}>
          {t("productError.retry")}
        </Button>
      </TableCell>
    </TableRow>
  );
};
