import { useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";

import type { IProduct } from "@/types/products";

import styles from "./ProductGallery.module.scss";

interface ProductGalleryProps {
  product: IProduct;
}

export const ProductGallery = ({ product }: ProductGalleryProps) => {
  const images =
    product.images.length > 0 ? product.images : [product.thumbnail];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [product.id, product.images, product.thumbnail]);

  return (
    <Box className={styles.gallery}>
      <Box className={styles.mainImageWrapper}>
        <Box
          component="img"
          src={selectedImage}
          alt={product.title}
          className={styles.mainImage}
        />
      </Box>

      <Stack className={styles.thumbnails}>
        {images.map((image, index) => {
          const isSelected = selectedImage === image;

          return (
            <Box
              key={`${image}-${index}`}
              component="button"
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`${styles.thumbnail} ${
                isSelected ? styles.thumbnailSelected : ""
              }`}
            >
              <Box
                component="img"
                src={image}
                alt={`${product.title} ${index + 1}`}
                className={styles.thumbnailImage}
              />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
