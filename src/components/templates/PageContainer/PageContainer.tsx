import type { ReactNode } from "react";

import { Container, type TAppContainerProps } from "@/components";

export interface IPageContainerProps extends TAppContainerProps {
  children: ReactNode;
}

export function PageContainer({ children, ...props }: IPageContainerProps) {
  return (
    <Container maxWidth="lg" {...props}>
      {children}
    </Container>
  );
}
