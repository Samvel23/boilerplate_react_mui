import { AuthTemplate, Card, LoginForm } from "@/components";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import styles from "./LoginPage.module.scss";

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <AuthTemplate>
      <Card className={styles.card}>
        <div className={styles.header}>
          <Typography component="h1" variant="h4" className={styles.title}>
            {t("auth.welcome")}
          </Typography>

          <Typography variant="body1" className={styles.description}>
            {t("auth.toContinue")}
          </Typography>
        </div>

        <LoginForm />
      </Card>
    </AuthTemplate>
  );
};
