import { Button, type ButtonProps } from "@mui/material";

export interface IAppButtonProps extends ButtonProps {}

export const AppButton = ({ children, ...props }: IAppButtonProps) => {
  return <Button {...props}>{children}</Button>;
};
