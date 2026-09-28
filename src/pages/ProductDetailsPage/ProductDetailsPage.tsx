import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import {
  ProductForm,
  ProductGallery,
  ProductInfo,
  ProductReviews,
} from "./elements";

import { useProductActions, useProductDetails } from "./hooks";

import { useProductChangesStore } from "@/stores/productChangesStore";

import styles from "./ProductDetailsPage.module.scss";

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { effectiveProduct, loading, error } = useProductDetails(id);

  const { saving, handleEdit } = useProductActions(effectiveProduct);

  const hasLocalChanges = useProductChangesStore(
    (state) => state.hasLocalChanges,
  );

  const isModifiedLocally = effectiveProduct
    ? hasLocalChanges(effectiveProduct.id)
    : false;

  if (loading) {
    return (
      <Box className={styles.page}>
        <Paper elevation={0} className={styles.stateCard}>
          <Typography color="text.secondary">Loading product...</Typography>
        </Paper>
      </Box>
    );
  }

  if (error || !effectiveProduct) {
    return (
      <Box className={styles.page}>
        <Paper elevation={0} className={styles.stateCard}>
          <Typography variant="h6">
            Product not found
          </Typography>

          <Typography variant="body2" color="text.secondary">
            We couldn't load this product.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className={styles.page}>
      <Stack className={styles.container}>
        <Box className={styles.header}>
          <Typography variant="h4" className={styles.title}>
            Product details
          </Typography>

          <Typography variant="body2" color="text.secondary">
            View and manage product information
          </Typography>
        </Box>

        <Paper elevation={0} className={styles.card}>
          <Stack className={styles.content}>
            <ProductGallery product={effectiveProduct} />

            <ProductInfo product={effectiveProduct} />

            {isModifiedLocally && (
              <Box>
                <Chip label="Modified locally" size="small" color="warning" />
              </Box>
            )}

            <ProductReviews />

            <Box className={styles.formSection}>
              <ProductForm
                product={effectiveProduct}
                loading={saving}
                onSubmit={handleEdit}
              />
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};
