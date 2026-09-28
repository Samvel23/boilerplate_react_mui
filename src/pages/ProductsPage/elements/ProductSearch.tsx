import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./ProductSearch.module.scss";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProductSearch = ({ value, onChange }: ProductSearchProps) => {
  return (
    <TextField
      fullWidth
      className={styles.search}
      label="Search products"
      placeholder="Search by product name..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
