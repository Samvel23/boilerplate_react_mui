import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useCategories } from "@/hooks";

import { useProductChangesStore } from "@/stores/useProductChangesStore";

import {
  ProductForm,
  ProductGallery,
  ProductInfo,
  ProductReviews,
} from "./elements";

import { useProductActions, useProductDetails } from "./hooks";

import styles from "./ProductDetailsPage.module.scss";

export const ProductDetailsPage = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { id } = useParams<{
    id: string;
  }>();

  const { effectiveProduct, loading, error } = useProductDetails(id);

  const { categories, loading: categoriesLoading } = useCategories();

  const { saving, deleting, handleEdit, handleDelete } =
    useProductActions(effectiveProduct);

  const hasLocalChanges = useProductChangesStore(
    (state) => state.hasLocalChanges,
  );

  const discardProductChanges = useProductChangesStore(
    (state) => state.discardProductChanges,
  );

  const isModifiedLocally = effectiveProduct
    ? hasLocalChanges(effectiveProduct.id)
    : false;

  const handleBackToProducts = () => {
    navigate("/products");
  };

  const handleDeleteProduct = async () => {
    const deleted = await handleDelete();

    if (deleted) {
      navigate("/products");
    }
  };

  const handleDiscardChanges = () => {
    if (!effectiveProduct) {
      return;
    }

    discardProductChanges(effectiveProduct.id);
  };

  if (loading) {
    return (
      <Box className={styles.page}>
        <Paper elevation={0} className={styles.stateCard}>
          <Typography color="text.secondary">
            {t("productDetails.loading")}
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (error || !effectiveProduct) {
    return (
      <Box className={styles.page}>
        <Paper elevation={0} className={styles.stateCard}>
          <Typography variant="h6" className={styles.stateTitle}>
            {t("productDetails.notFound.title")}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t("productDetails.notFound.message")}
          </Typography>

          <Button
            type="button"
            variant="contained"
            onClick={handleBackToProducts}
          >
            {t("productDetails.back")}
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className={styles.page}>
      <Stack className={styles.container}>
        <Box className={styles.header}>
          <Box>
            <Button
              type="button"
              variant="text"
              onClick={handleBackToProducts}
              className={styles.backButton}
            >
              ← {t("productDetails.back")}
            </Button>

            <Typography variant="h4" className={styles.title}>
              {t("productDetails.title")}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {t("productDetails.subtitle")}
            </Typography>
          </Box>

          <Button
            type="button"
            variant="outlined"
            color="error"
            disabled={deleting || saving}
            onClick={handleDeleteProduct}
          >
            {deleting
              ? t("productDetails.deleting")
              : t("productDetails.delete")}
          </Button>
        </Box>

        <Paper elevation={0} className={styles.card}>
          <Box className={styles.productSection}>
            <Box className={styles.gallerySection}>
              <ProductGallery product={effectiveProduct} />
            </Box>

            <Box className={styles.infoSection}>
              <ProductInfo product={effectiveProduct} />
            </Box>
          </Box>

          {isModifiedLocally && (
            <Box className={styles.localChanges}>
              <Chip
                label={t("productDetails.modifiedLocally")}
                size="small"
                color="warning"
              />

              <Button
                type="button"
                variant="outlined"
                color="warning"
                size="small"
                onClick={handleDiscardChanges}
              >
                {t("productDetails.discardChanges")}
              </Button>
            </Box>
          )}
        </Paper>

        <Paper elevation={0} className={styles.sectionCard}>
          <ProductReviews />
        </Paper>

        <Paper elevation={0} className={styles.sectionCard}>
          <ProductForm
            product={effectiveProduct}
            categories={categories}
            loading={saving || categoriesLoading}
            onSubmit={handleEdit}
          />
        </Paper>
      </Stack>
    </Box>
  );
};
