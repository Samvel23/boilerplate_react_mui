import type { ReactNode } from "react";

import styles from "./FormField.module.scss";

export interface IFormFieldProps {
  children: ReactNode;
  error?: string;
}

export const FormField = ({ children, error }: IFormFieldProps) => {
  return (
    <div className={styles.field}>
      {children}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
