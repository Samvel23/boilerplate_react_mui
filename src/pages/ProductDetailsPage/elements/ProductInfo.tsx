import { Box, Chip, Divider, Rating, Stack, Typography } from "@mui/material";

import type { IProduct } from "@/types/products";

import styles from "./ProductInfo.module.scss";

interface ProductInfoProps {
  product: IProduct;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <Stack className={styles.info}>
      <Box>
        <Typography variant="h4" className={styles.title}>
          {product.title}
        </Typography>

        {product.brand && (
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.brand}
          >
            {product.brand}
          </Typography>
        )}
      </Box>

      <Stack className={styles.chips}>
        <Chip label={product.category} size="small" />

        <Chip
          label={
            product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"
          }
          size="small"
          color={product.stock > 0 ? "success" : "error"}
          variant="outlined"
        />

        <Chip
          label={`Rating: ${product.rating}`}
          size="small"
          variant="outlined"
        />
      </Stack>

      <Box className={styles.rating}>
        <Rating value={product.rating} precision={0.1} readOnly />

        <Typography variant="body2" color="text.secondary">
          {product.rating} / 5
        </Typography>
      </Box>

      <Divider />

      <Typography
        variant="body1"
        color="text.secondary"
        className={styles.description}
      >
        {product.description}
      </Typography>

      <Box>
        <Typography variant="h5" className={styles.price}>
          ${product.price}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Current product price
        </Typography>
      </Box>
    </Stack>
  );
};
