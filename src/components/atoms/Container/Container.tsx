import { Container as MuiContainer, type ContainerProps } from "@mui/material";

export interface IAppContainerProps extends ContainerProps {}

export const Container = ({ children, ...props }: IAppContainerProps) => (
  <MuiContainer {...props}>{children}</MuiContainer>
);
