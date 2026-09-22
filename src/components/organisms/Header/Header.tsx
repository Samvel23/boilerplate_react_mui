import type { ReactNode } from "react";

import { ThemeToggle } from "@/components";

import styles from "./Header.module.scss";

export interface IAppHeaderProps {
  title?: string;
  children?: ReactNode;
  showThemeToggle?: boolean;
}

export const Header = ({
  title = "React MUI App",
  children,
  showThemeToggle = true,
}: IAppHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.actions}>
          {children}

          {showThemeToggle && <ThemeToggle />}
        </div>
      </div>
    </header>
  );
}
