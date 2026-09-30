import { useMemo } from "react";
 
import { Link as RouterLink, useNavigate } from "react-router-dom";

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

import { useTranslation } from "react-i18next";

import type { IProduct } from "@/types/products";

import { formatCurrency, getCurrentLanguage } from "@/language";

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

  const { t } = useTranslation();

  const language = getCurrentLanguage();

  const productChanges = useProductChangesStore(
    (state) => state.productChanges,
  );

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleProductKeyDown = (
    event: React.KeyboardEvent<HTMLTableRowElement>,
    productId: number,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleProductClick(productId);
  };

  const effectiveProducts = useMemo(() => {
    return products.map((product) => {
      const changes = productChanges[product.id];

      if (!changes) {
        return product;
      }

      return mergeProductChanges(product, changes);
    });
  }, [products, productChanges]);

  return (
    <Box className={styles.wrapper}>
      <Table
        className={styles.table}
        size="medium"
        aria-label={t("productTable.label")}
      >
        <TableHead>
          <TableRow className={styles.headerRow}>
            <TableCell className={styles.idCell}>
              {t("productTable.id")}
            </TableCell>

            <TableCell>{t("productTable.product")}</TableCell>

            <TableCell>{t("productTable.category")}</TableCell>

            <TableCell>
              <TableSortLabel
                active={sortBy === "price"}
                direction={sortBy === "price" ? order : "asc"}
                onClick={() => onSort("price")}
              >
                {t("productTable.price")}
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={sortBy === "rating"}
                direction={sortBy === "rating" ? order : "asc"}
                onClick={() => onSort("rating")}
              >
                {t("productTable.rating")}
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={sortBy === "stock"}
                direction={sortBy === "stock" ? order : "asc"}
                onClick={() => onSort("stock")}
              >
                {t("productTable.stock")}
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
                  tabIndex={0}
                  onClick={() => handleProductClick(product.id)}
                  onKeyDown={(event) => handleProductKeyDown(event, product.id)}
                  aria-label={product.title}
                >
                  <TableCell className={styles.idCell}>{product.id}</TableCell>

                  <TableCell>
                    <Box className={styles.product}>
                      <Box
                        component="img"
                        src={product.thumbnail}
                        alt=""
                        className={styles.thumbnail}
                      />

                      <Box className={styles.productInfo}>
                        <Typography
                          component={RouterLink}
                          to={`/products/${product.id}`}
                          variant="body2"
                          className={styles.productTitle}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
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
                            label={t("productTable.modifiedLocally")}
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
                      {formatCurrency(product.price, language)}
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
