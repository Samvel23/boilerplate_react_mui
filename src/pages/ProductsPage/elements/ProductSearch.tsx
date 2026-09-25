import { TextField } from "@/components";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProductSearch = ({ value, onChange }: ProductSearchProps) => {
  return (
    <TextField
      label="Search products"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
