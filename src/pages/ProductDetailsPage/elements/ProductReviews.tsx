import { Box, Divider, Stack, Typography } from "@mui/material";

import styles from "./ProductReviews.module.scss";

export const ProductReviews = () => {
  return (
    <Stack className={styles.reviews}>
      <Box>
        <Typography variant="h6" className={styles.title}>
          Reviews
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Customer feedback
        </Typography>
      </Box>

      <Divider />

      <Box className={styles.empty}>
        <Typography variant="body2" color="text.secondary">
          Reviews will appear here.
        </Typography>
      </Box>
    </Stack>
  );
};
