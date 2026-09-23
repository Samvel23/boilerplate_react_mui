import { Button as MuiButton, type ButtonProps } from "@mui/material";

export interface IAppButtonProps extends ButtonProps {}

export const Button = ({ children, ...props }: IAppButtonProps) => (
  <MuiButton {...props}>{children}</MuiButton>
);
