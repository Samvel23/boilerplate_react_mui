import { IconButton, type IconButtonProps } from "@mui/material";

export interface IAppIconButtonProps extends IconButtonProps {}

export const AppIconButton = ({ children, ...props }: IAppIconButtonProps) => {
  return <IconButton {...props}>{children}</IconButton>;
};
