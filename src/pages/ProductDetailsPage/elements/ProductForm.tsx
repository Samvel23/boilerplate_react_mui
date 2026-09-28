import { useMemo, useState } from "react";

import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { ICategory, IProduct } from "@/types/products";

import styles from "./ProductForm.module.scss";

export interface IProductFormValues {
  title: string;
  price: string;
  stock: string;
  brand: string;
  category: string;
  imageUrl: string;
  description: string;
}

interface IProductFormProps {
  loading?: boolean;
  product?: IProduct;
  categories: ICategory[];
  onSubmit: (values: IProductFormValues) => void;
}

const createInitialValues = (product?: IProduct): IProductFormValues => ({
  title: product?.title ?? "",
  description: product?.description ?? "",
  category: product?.category ?? "",
  price: product?.price.toString() ?? "",
  stock: product?.stock.toString() ?? "",
  brand: product?.brand ?? "",
  imageUrl: product?.thumbnail ?? "",
});

export const ProductForm = ({
  product,
  categories,
  loading = false,
  onSubmit,
}: IProductFormProps) => {
  const [values, setValues] = useState<IProductFormValues>(() =>
    createInitialValues(product),
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof IProductFormValues, string>>
  >({});

  const handleChange = (field: keyof IProductFormValues, value: string) => {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const isModified = useMemo(() => {
    if (!product) {
      return true;
    }

    const original = {
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      brand: product.brand ?? "",
      imageUrl: product.thumbnail ?? "",
    };

    const current = {
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category.trim(),
      price: Number(values.price),
      stock: Number(values.stock),
      brand: values.brand.trim(),
      imageUrl: values.imageUrl.trim(),
    };

    return (
      original.title !== current.title ||
      original.description !== current.description ||
      original.category !== current.category ||
      original.price !== current.price ||
      original.stock !== current.stock ||
      original.brand !== current.brand ||
      original.imageUrl !== current.imageUrl
    );
  }, [product, values]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof IProductFormValues, string>> = {};

    if (!values.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!values.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!values.category.trim()) {
      newErrors.category = "Category is required";
    }

    const price = Number(values.price);

    if (!values.price.trim()) {
      newErrors.price = "Price is required";
    } else if (!Number.isFinite(price) || price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    const stock = Number(values.stock);

    if (!values.stock.trim()) {
      newErrors.stock = "Stock is required";
    } else if (!Number.isInteger(stock) || stock < 0) {
      newErrors.stock = "Stock must be a whole number >= 0";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = useMemo(() => {
    const price = Number(values.price);
    const stock = Number(values.stock);

    return (
      Boolean(values.title.trim()) &&
      Boolean(values.description.trim()) &&
      Boolean(values.category.trim()) &&
      Boolean(values.price.trim()) &&
      Number.isFinite(price) &&
      price > 0 &&
      Boolean(values.stock.trim()) &&
      Number.isInteger(stock) &&
      stock >= 0
    );
  }, [values]);

  const isSubmitDisabled =
    loading || !isFormValid || (Boolean(product) && !isModified);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    if (product && !isModified) {
      return;
    }

    onSubmit(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.form}>
      <Stack className={styles.content}>
        <Box>
          <Typography variant="h6" className={styles.title}>
            {product ? "Edit product" : "Create product"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {product
              ? "Update the product information below."
              : "Enter the product information below."}
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Title"
          value={values.title}
          onChange={(event) => handleChange("title", event.target.value)}
          error={Boolean(errors.title)}
          helperText={errors.title}
        />

        <TextField
          fullWidth
          label="Description"
          multiline
          minRows={4}
          value={values.description}
          onChange={(event) => handleChange("description", event.target.value)}
          error={Boolean(errors.description)}
          helperText={errors.description}
        />

        <Box className={styles.grid}>
          <TextField
            select
            fullWidth
            label="Category"
            value={values.category}
            onChange={(event) => handleChange("category", event.target.value)}
            error={Boolean(errors.category)}
            helperText={errors.category ?? "Choose a product category"}
          >
            {categories.map((category) => (
              <MenuItem key={category.slug} value={category.slug}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Brand"
            value={values.brand}
            onChange={(event) => handleChange("brand", event.target.value)}
            error={Boolean(errors.brand)}
            helperText={errors.brand}
          />
        </Box>

        <TextField
          fullWidth
          label="Image URL"
          value={values.imageUrl}
          onChange={(event) => handleChange("imageUrl", event.target.value)}
          error={Boolean(errors.imageUrl)}
          helperText={errors.imageUrl ?? "Use a direct URL to an image"}
          placeholder="https://example.com/product.jpg"
        />

        <Box className={styles.grid}>
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={values.price}
            onChange={(event) => handleChange("price", event.target.value)}
            error={Boolean(errors.price)}
            helperText={errors.price}
            slotProps={{
              htmlInput: {
                min: 0,
                step: "0.01",
              },
            }}
          />

          <TextField
            fullWidth
            label="Stock"
            type="number"
            value={values.stock}
            onChange={(event) => handleChange("stock", event.target.value)}
            error={Boolean(errors.stock)}
            helperText={errors.stock}
            slotProps={{
              htmlInput: {
                min: 0,
                step: 1,
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitDisabled}
          className={styles.button}
        >
          {loading
            ? product
              ? "Saving..."
              : "Creating..."
            : product
              ? "Save changes"
              : "Create product"}
        </Button>

        {product && !isModified && (
          <Typography
            variant="caption"
            color="text.secondary"
            className={styles.noChanges}
          >
            No changes to save
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
