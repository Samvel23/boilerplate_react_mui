import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import type { ICategory } from "@/types/products";

import styles from "./ProductCategoryFilter.module.scss";

interface IProductCategoryFilterProps {
  value: string;
  categories: ICategory[];
  onChange: (event: SelectChangeEvent) => void;
  disabled: boolean;
}

export const ProductCategoryFilter = ({
  value,
  categories,
  onChange,
  disabled = false,
}: IProductCategoryFilterProps) => {
  const { t } = useTranslation();

  return (
    <FormControl className={styles.filter} size="small" disabled={disabled}>
      <InputLabel id="product-category-label">
        {t("productCategoryFilter.label")}
      </InputLabel>

      <Select
        labelId="product-category-label"
        value={value}
        label={t("productCategoryFilter.label")}
        className={styles.select}
        onChange={onChange}
        disabled={disabled}
      >
        <MenuItem value="">{t("productCategoryFilter.all")}</MenuItem>

        {categories.map((category) => (
          <MenuItem key={category.slug} value={category.slug}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
