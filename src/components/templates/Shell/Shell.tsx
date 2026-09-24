import { Outlet } from "react-router-dom";

import { Header } from "@/components";

import styles from "./Shell.module.scss";

export const Shell = () => {
  return (
    <div className={styles.shell}>
      <Header />

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
