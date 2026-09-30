import type { ReactNode } from "react";

import styles from "./FormActions.module.scss";

export interface IFormActionsProps {
  children: ReactNode;
}

export const FormActions = ({ children }: IFormActionsProps) => (
  <div className={styles.actions}>{children}</div>
);
