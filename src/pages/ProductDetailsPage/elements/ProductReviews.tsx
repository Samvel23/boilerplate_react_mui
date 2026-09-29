import { Box, Divider, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import styles from "./ProductReviews.module.scss";

export const ProductReviews = () => {
  const { t } = useTranslation();

  return (
    <Stack className={styles.reviews}>
      <Box>
        <Typography variant="h6" className={styles.title}>
          {t("productReviews.title")}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {t("productReviews.subtitle")}
        </Typography>
      </Box>

      <Divider />

      <Box className={styles.empty}>
        <Typography variant="body2" color="text.secondary">
          {t("productReviews.empty")}
        </Typography>
      </Box>
    </Stack>
  );
};
