import type { ReactNode } from "react";

import styles from "./FormActions.module.scss";

export interface IFormActionsProps {
  children: ReactNode;
}

export const FormActions = ({ children }: IFormActionsProps) => {
  return <div className={styles.actions}>{children}</div>;
};
