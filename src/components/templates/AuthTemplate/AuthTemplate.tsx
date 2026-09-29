import type { ReactNode } from "react";

import styles from "./AuthTemplate.module.scss";

export interface IAuthTemplateProps {
  children: ReactNode;
}

export const AuthTemplate = ({ children }: IAuthTemplateProps) => {
  return (
    <main className={styles.template}>
      <div className={styles.content}>{children}</div>
    </main>
  );
};
