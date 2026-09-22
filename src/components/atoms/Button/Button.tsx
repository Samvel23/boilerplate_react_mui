import { Button as MuiButton, type ButtonProps } from "@mui/material";

export interface IAppButtonProps extends ButtonProps {}

export const Button = ({ children, ...props }: IAppButtonProps) => {
  return <MuiButton {...props}>{children}</MuiButton>;
};
