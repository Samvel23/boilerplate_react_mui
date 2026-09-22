import type { ReactNode } from "react";

import { Header } from "@/components";

import styles from "./Shell.module.scss";

export interface IShellProps {
  children: ReactNode;
  title?: string;
}

export const Shell = ({ children, title = "React MUI App" }: IShellProps) => {
  return (
    <div className={styles.shell}>
      <Header title={title} />

      <main className={styles.main}>{children}</main>
    </div>
  );
};
