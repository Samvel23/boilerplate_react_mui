import { Container as MuiContainer, type ContainerProps } from "@mui/material";

export type TAppContainerProps = ContainerProps 

export const Container = ({ children, ...props }: TAppContainerProps) => (
  <MuiContainer {...props}>{children}</MuiContainer>
);
