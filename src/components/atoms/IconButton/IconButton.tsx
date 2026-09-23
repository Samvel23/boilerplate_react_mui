import {
  IconButton as MuiIconButton,
  type IconButtonProps,
} from "@mui/material";

export interface IAppIconButtonProps extends IconButtonProps {}

export const IconButton = ({ children, ...props }: IAppIconButtonProps) => (
  <MuiIconButton {...props}>{children}</MuiIconButton>
);
