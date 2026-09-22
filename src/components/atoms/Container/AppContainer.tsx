import { Container, type ContainerProps } from "@mui/material";

export interface IAppContainerProps extends ContainerProps {}

export const AppContainer = ({ children, ...props }: IAppContainerProps) => {
  return <Container {...props}>{children}</Container>;
};
