import {
  IconButton as MuiIconButton,
  type IconButtonProps,
} from "@mui/material";

export type TAppIconButtonProps = IconButtonProps 

export const IconButton = ({ children, ...props }: TAppIconButtonProps) => (
  <MuiIconButton {...props}>{children}</MuiIconButton>
);
