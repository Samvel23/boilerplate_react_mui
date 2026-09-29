import type { ReactNode } from "react";

import {
  Container,
  type IAppContainerProps,
} from "@/components";

export interface IPageContainerProps
  extends IAppContainerProps {
  children: ReactNode;
}

export function PageContainer({
  children,
  ...props
}: IPageContainerProps) {
  return (
    <Container
      maxWidth="lg"
      {...props}
    >
      {children}
    </Container>
  );
}