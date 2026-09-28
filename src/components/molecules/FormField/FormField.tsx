import type { ReactNode } from "react";

import styles from "./FormField.module.scss";

export interface IFormFieldProps {
  children: ReactNode;
}

export const FormField = ({ children }: IFormFieldProps) => {
  return <div className={styles.field}>{children}</div>;
};
