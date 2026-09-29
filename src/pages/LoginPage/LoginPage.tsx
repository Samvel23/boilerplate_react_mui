import Typography from "@mui/material/Typography";

import { Card, AuthTemplate, LoginForm } from "@/components";

import { useTranslation } from "react-i18next";

import styles from "./LoginPage.module.scss";

export const LoginPage = () => {
  const { t } = useTranslation();

  const handleLogin = (values: { email: string; password: string }) => {
    console.log("Login values:", values);
  };

  return (
    <AuthTemplate>
      <Card className={styles.card}>
        <Typography component="h2" variant="h4" gutterBottom>
          {t("Welcome")}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: "24px" }}>
          {t("toContiniue")}
        </Typography>

        <LoginForm onSubmit={handleLogin} />
      </Card>
    </AuthTemplate>
  );
};
