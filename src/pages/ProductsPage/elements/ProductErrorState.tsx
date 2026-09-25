import { Button, TableCell, TableRow } from "@mui/material";

interface ProductErrorStateProps {
  onRetry: () => void;
}

export const ProductErrorState = ({ onRetry }: ProductErrorStateProps) => {
  return (
    <TableRow>
      <TableCell colSpan={6} align="center">
        No Product.
        <Button onClick={onRetry}>Retry loading</Button>
      </TableCell>
    </TableRow>
  );
};
