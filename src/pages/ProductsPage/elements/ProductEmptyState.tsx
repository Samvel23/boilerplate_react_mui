import { TextField } from "@/components";
import { TableCell, TableRow } from "@mui/material";

export const ProductEmptyState = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} align="center">
        <TextField>No data available to display.</TextField>
      </TableCell>
    </TableRow>
  );
};
