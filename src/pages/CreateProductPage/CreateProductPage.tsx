import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Paper, Stack, Typography } from "@mui/material";

import { useCategories } from "@/hooks";

import {
  ProductForm,
  type IProductFormValues,
} from "@/pages/ProductDetailsPage/elements";

import { createProduct } from "@/api/products/createProduct";

import { useProductChangesStore } from "@/stores/useProductChangesStore";

import type { IProduct } from "@/types/products";

import styles from "./ProductCreatePage.module.scss";

let localProductIdCounter = 0;

const createLocalProductId = () => {
  localProductIdCounter += 1;

  return -(Date.now() * 1000 + localProductIdCounter);
};

export const CreateProductPage = () => {
  const navigate = useNavigate();

  const { categories, loading: categoriesLoading } = useCategories();

  const addCreatedProduct = useProductChangesStore(
    (state) => state.addCreatedProduct,
  );

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
        values.imageUrl?.trim() || "https://placehold.co/600x400?text=Product";

      const createdProduct: IProduct = {
        ...response.data,

        // DummyJSON can return the same ID for created products.
        // Use a unique negative ID for products created locally.
        id: createLocalProductId(),

        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category,
        price: Number(values.price),
        stock: Number(values.stock),
        brand: values.brand.trim() || undefined,

        discountPercentage: response.data.discountPercentage ?? 0,
        rating: response.data.rating ?? 0,

        thumbnail: imageUrl,
        images: [imageUrl],
      };

      addCreatedProduct(createdProduct);

      navigate("/products");
    } catch (error) {
      console.error("Error creating product", error);
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
            ← Back to products
          </Button>

          <Typography variant="h4" className={styles.title}>
            Create product
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Add a new product to your catalog.
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
              Cancel
            </Button>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};
