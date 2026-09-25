import { TablePagination } from "@mui/material";

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
  return (
    <TablePagination
      component="div"
      count={total}
      page={page}
      rowsPerPage={limit}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      rowsPerPageOptions={[5, 10, 20, 30]}
    />
  );
};
