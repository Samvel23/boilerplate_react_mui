import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

import type { ICategory } from "@/types/products";

import styles from "./ProductCategoryFilter.module.scss";

interface ProductCategoryFilterProps {
  value: string;
  categories: ICategory[];
  onChange: (event: SelectChangeEvent) => void;
}

export const ProductCategoryFilter = ({
  value,
  categories,
  onChange,
}: ProductCategoryFilterProps) => {
  return (
    <FormControl className={styles.filter} size="small">
      <InputLabel id="product-category-label">Category</InputLabel>

      <Select
        labelId="product-category-label"
        value={value}
        label="Category"
        className={styles.select}
        onChange={onChange}
      >
        <MenuItem value="">All categories</MenuItem>

        {categories.map((category) => (
          <MenuItem key={category.slug} value={category.slug}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
