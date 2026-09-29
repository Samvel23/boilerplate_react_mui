import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Button, Paper, Stack, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import { createProduct } from "@/api/products/createProduct";

import { useCategories } from "@/hooks";

import { useToast } from "@/hooks/useToast";

import {
  ProductForm,
  type IProductFormValues,
} from "@/pages/ProductDetailsPage/elements";

import { useProductChangesStore } from "@/stores/useProductChangesStore";

import type { IProduct } from "@/types/products";

import styles from "./ProductCreatePage.module.scss";

const createRandomRating = () => {
  return Number((1 + Math.random() * 4).toFixed(1));
};

export const CreateProductPage = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { categories, loading: categoriesLoading } = useCategories();

  const addCreatedProduct = useProductChangesStore(
    (state) => state.addCreatedProduct,
  );

  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);

  const handleCreate = async (values: IProductFormValues) => {
    try {
      setLoading(true);

      const response = await createProduct({
        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category,
        price: Number(values.price),
        stock: Number(values.stock),
        brand: values.brand.trim() || undefined,
      });

      const imageUrl =
        values.imageUrl.trim() || "https://placehold.co/600x400?text=Product";

      const createdProduct: IProduct = {
        ...response.data,

        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category,
        price: Number(values.price),
        stock: Number(values.stock),

        brand: values.brand.trim() || undefined,

        discountPercentage: response.data.discountPercentage ?? 0,

        rating: createRandomRating(),

        thumbnail: imageUrl,
        images: [imageUrl],
      };

      /*
       * The store is responsible for
       * generating the local product ID.
       */
      addCreatedProduct(createdProduct);

      showToast(t("productActions.created"), "success");

      navigate("/products");
    } catch (error) {
      console.error("Error creating product", error);

      showToast(t("productActions.createFailed"), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <Box className={styles.page}>
      <Stack className={styles.container}>
        <Box className={styles.header}>
          <Button type="button" variant="text" onClick={handleCancel}>
            ← {t("productDetails.back")}
          </Button>

          <Typography variant="h4" className={styles.title}>
            {t("productForm.createTitle")}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t("productForm.createDescription")}
          </Typography>
        </Box>

        <Paper elevation={0} className={styles.card}>
          <ProductForm
            categories={categories}
            loading={loading || categoriesLoading}
            onSubmit={handleCreate}
          />

          <Box className={styles.actions}>
            <Button
              type="button"
              variant="outlined"
              disabled={loading}
              onClick={handleCancel}
            >
              {t("actions.cancel")}
            </Button>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};
