import type { ReactNode } from "react";

import {
  AppContainer,
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
    <AppContainer
      maxWidth="lg"
      {...props}
    >
      {children}
    </AppContainer>
  );
}