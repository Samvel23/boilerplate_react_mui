import { TablePagination } from "@mui/material";
import { useTranslation } from "react-i18next";

import styles from "./ProductPagination.module.scss";

interface ProductPaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProductPagination = ({
  page,
  limit,
  total,
  onPageChange,
  onRowsPerPageChange,
}: ProductPaginationProps) => {
  const { t } = useTranslation();

  return (
    <TablePagination
      component="div"
      className={styles.pagination}
      count={total}
      page={page}
      rowsPerPage={limit}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      rowsPerPageOptions={[5, 10, 20, 30]}
      labelRowsPerPage={t("pagination.rowsPerPage")}
      labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} ${t("products.item", {
          count,
        })}`
      }
    />
  );
};
