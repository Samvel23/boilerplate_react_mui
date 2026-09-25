import { TextField as MuiTextField, type TextFieldProps } from "@mui/material";

export type TTextFieldProps = TextFieldProps;

export const TextField = ({ children, ...props }: TTextFieldProps) => (
  <MuiTextField {...props}>{children}</MuiTextField>
);
