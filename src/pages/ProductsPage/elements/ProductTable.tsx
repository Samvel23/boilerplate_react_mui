import { useNavigate } from "react-router-dom";

import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

import type { IProduct } from "@/types/products";

import { useProductChangesStore } from "@/stores/useProductChangesStore";
import { mergeProductChanges } from "@/utils/products/mergeProductChanges";

import { ProductEmptyState, ProductErrorState, ProductSkeleton } from ".";

import styles from "./ProductTable.module.scss";

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
  const navigate = useNavigate();

  const productChanges = useProductChangesStore(
    (state) => state.productChanges,
  );

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const effectiveProducts = products.map((product) => {
    const changes = productChanges[product.id];

    if (!changes) {
      return product;
    }

    return mergeProductChanges(product, changes);
  });

  return (
    <Box className={styles.wrapper}>
      <Table className={styles.table} size="medium">
        <TableHead>
          <TableRow className={styles.headerRow}>
            <TableCell className={styles.idCell}>ID</TableCell>

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
          {loading && products.length === 0 ? (
            <ProductSkeleton />
          ) : error ? (
            <ProductErrorState onRetry={onRetry} />
          ) : effectiveProducts.length === 0 ? (
            <ProductEmptyState />
          ) : (
            effectiveProducts.map((product) => {
              const isModified = Boolean(productChanges[product.id]);

              return (
                <TableRow
                  key={product.id}
                  className={styles.row}
                  hover
                  onClick={() => handleProductClick(product.id)}
                >
                  <TableCell className={styles.idCell}>{product.id}</TableCell>

                  <TableCell>
                    <Box className={styles.product}>
                      <Box
                        component="img"
                        src={product.thumbnail}
                        alt={product.title}
                        className={styles.thumbnail}
                      />

                      <Box className={styles.productInfo}>
                        <Typography
                          variant="body2"
                          className={styles.productTitle}
                        >
                          {product.title}
                        </Typography>

                        {product.brand && (
                          <Typography variant="caption" color="text.secondary">
                            {product.brand}
                          </Typography>
                        )}

                        {isModified && (
                          <Chip
                            label="Modified locally"
                            size="small"
                            color="warning"
                            className={styles.localChip}
                          />
                        )}
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={product.category}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" className={styles.price}>
                      ${product.price}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box className={styles.rating}>
                      <Typography variant="body2">★</Typography>

                      <Typography
                        variant="body2"
                        className={styles.ratingValue}
                      >
                        {product.rating}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={product.stock}
                      size="small"
                      color={product.stock > 0 ? "success" : "error"}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Box>
  );
};
