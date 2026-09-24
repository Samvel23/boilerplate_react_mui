import { Button as MuiButton, type ButtonProps } from "@mui/material";

export type TAppButtonProps = ButtonProps 

export const Button = ({ children, ...props }: TAppButtonProps) => (
  <MuiButton {...props}>{children}</MuiButton>
);
