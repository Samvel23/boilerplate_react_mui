import Typography from "@mui/material/Typography";

import { AppCard, AuthTemplate, LoginForm } from "@/components";

import styles from "./LoginPage.module.scss";

export const LoginPage = () => {
  const handleLogin = (values: { email: string; password: string }) => {
    console.log("Login values:", values);
  };

  return (
    <AuthTemplate>
      <AppCard className={styles.card}>
        <Typography component="h2" variant="h4" gutterBottom>
          Welcome back
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: "24px" }}>
          Sign in to continue.
        </Typography>

        <LoginForm onSubmit={handleLogin} />
      </AppCard>
    </AuthTemplate>
  );
};
