import { InputAdornment, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { useTranslation } from "react-i18next";

import styles from "./ProductSearch.module.scss";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProductSearch = ({ value, onChange }: ProductSearchProps) => {
  const { t } = useTranslation();

  return (
    <TextField
      fullWidth
      className={styles.search}
      label={t("productSearch.label")}
      placeholder={t("productSearch.placeholder")}
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
