import type { ReactNode } from "react";

import { Header } from "@/components";

import styles from "./Shell.module.scss";
import { useStore } from "@/stores/useStore";

export interface IShellProps {
  children: ReactNode;
}

export const Shell = ({ children }: IShellProps) => {
  const header = useStore((s) => s.appContent.heading);
  return (
    <div className={styles.shell}>
      <Header title={header} />

      <main className={styles.main}>{children}</main>
    </div>
  );
};
