import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";

import type { ICategory } from "@/types/products";

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
    <FormControl>
      <InputLabel>Category</InputLabel>

      <Select value={value} label="Category" onChange={onChange}>
        <MenuItem value="">All</MenuItem>

        {categories.map((category) => (
          <MenuItem key={category.slug} value={category.slug}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
