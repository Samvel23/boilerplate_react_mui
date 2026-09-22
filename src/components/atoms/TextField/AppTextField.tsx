import { TextField, type TextFieldProps } from "@mui/material";

export type TAppTextFieldProps = TextFieldProps;

export const AppTextField = ({ children, ...props }: TAppTextFieldProps) => {
  return <TextField {...props}>{children}</TextField>;
};
