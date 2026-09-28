import { useState } from "react";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import type { IProduct } from "@/types/products";

import styles from "./ProductForm.module.scss";

interface ProductFormValues {
  title: string;
  description: string;
  category: string;
  price: string;
  stock: string;
  brand: string;
}

interface ProductFormProps {
  product?: IProduct;
  loading?: boolean;
  onSubmit: (values: ProductFormValues) => void;
}

interface FieldConfig {
  name: keyof ProductFormValues;
  label: string;
  type?: "text" | "number";
}

const fields: FieldConfig[] = [
  {
    name: "category",
    label: "Category",
  },
  {
    name: "brand",
    label: "Brand",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
  },
  {
    name: "stock",
    label: "Stock",
    type: "number",
  },
];

export const ProductForm = ({
  product,
  loading = false,
  onSubmit,
}: ProductFormProps) => {
  const [values, setValues] = useState<ProductFormValues>({
    title: product?.title ?? "",
    description: product?.description ?? "",
    category: product?.category ?? "",
    price: product?.price.toString() ?? "",
    stock: product?.stock.toString() ?? "",
    brand: product?.brand ?? "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormValues, string>>
  >({});

  const handleChange = (field: keyof ProductFormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormValues, string>> = {};

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.form}>
      <Stack className={styles.content}>
        <Box>
          <Typography variant="h6" className={styles.title}>
            Edit product
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Update the product information below.
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
          {fields.slice(0, 2).map((field) => (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              type={field.type ?? "text"}
              value={values[field.name]}
              onChange={(event) => handleChange(field.name, event.target.value)}
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]}
            />
          ))}
        </Box>

        <Box className={styles.grid}>
          {fields.slice(2).map((field) => (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              type={field.type ?? "text"}
              value={values[field.name]}
              onChange={(event) => handleChange(field.name, event.target.value)}
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]}
            />
          ))}
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Saving..." : "Save changes"}
        </Button>
      </Stack>
    </Box>
  );
};
