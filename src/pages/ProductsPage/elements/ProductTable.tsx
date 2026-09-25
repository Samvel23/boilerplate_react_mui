import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import type { IProduct } from "@/types/products";

import { ProductEmptyState, ProductErrorState, ProductSkeleton } from ".";

interface ProductTableProps {
  products: IProduct[];
  loading: boolean;
  error: boolean;
  sortBy: string;
  order: "asc" | "desc";
  onSort: (field: string) => void;
  onRetry: () => void;
}

export const ProductTable = ({
  products,
  loading,
  error,
  sortBy,
  order,
  onSort,
  onRetry,
}: ProductTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>Category</TableCell>

          <TableCell>
            <TableSortLabel
              active={sortBy === "price"}
              direction={sortBy === "price" ? order : "asc"}
              onClick={() => onSort("price")}
            >
              Price
            </TableSortLabel>
          </TableCell>

          <TableCell>
            <TableSortLabel
              active={sortBy === "rating"}
              direction={sortBy === "rating" ? order : "asc"}
              onClick={() => onSort("rating")}
            >
              Rating
            </TableSortLabel>
          </TableCell>

          <TableCell>
            <TableSortLabel
              active={sortBy === "stock"}
              direction={sortBy === "stock" ? order : "asc"}
              onClick={() => onSort("stock")}
            >
              Stock
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {loading ? (
          <ProductSkeleton />
        ) : error ? (
          <ProductErrorState onRetry={onRetry} />
        ) : products.length === 0 ? (
          <ProductEmptyState />
        ) : (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell>{product.stock}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
