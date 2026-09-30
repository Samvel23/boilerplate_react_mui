import { useState, type FormEvent } from "react";

import { useTranslation } from "react-i18next";

import {
  Button,
  TextField,
  FormField,
  FormActions,
  PasswordField,
} from "@/components";

import type { ILoginFormValues } from "@/types/forms";

import { validateName, validatePassword } from "@/utils/validation";

import { loginAuth } from "@/api/auth/loginAuth";
import { useUserStore } from "@/stores/useUserStore";

import styles from "./LoginForm.module.scss";

export interface ILoginFormProps {
  onSubmit?: (values: ILoginFormValues) => void;
}

interface ILoginFormErrors {
  name?: string;
  password?: string;
}

export const LoginForm = ({ onSubmit }: ILoginFormProps) => {
  const { t } = useTranslation();

  const [values, setValues] = useState<ILoginFormValues>({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState<ILoginFormErrors>({});
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({
      ...current,
      name: event.target.value,
    }));

    setErrors((current) => ({
      ...current,
      name: undefined,
    }));

    setLoginError("");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({
      ...current,
      password: event.target.value,
    }));

    setErrors((current) => ({
      ...current,
      password: undefined,
    }));

    setLoginError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors: ILoginFormErrors = {};

    const nameError = validateName(values.name);

    if (nameError) {
      nextErrors.name = nameError;
    }

    const passwordError = validatePassword(values.password);

    if (passwordError) {
      nextErrors.password = passwordError;
    }

    setErrors(nextErrors);
    setLoginError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await loginAuth(values.name, values.password);

      const { accessToken, refreshToken, ...user } = res.data;

      useUserStore.getState().setUser(user);

      useUserStore.getState().setCredentials({
        accessToken,
        refreshToken,
      });

      onSubmit?.(values);
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(t("auth.loginFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorMessages = Object.values(errors).filter((error): error is string =>
    Boolean(error),
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {errorMessages.length > 0 && (
        <div
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className={styles.screenReaderErrors}
        >
          <p>{t("auth.validationSummary")}</p>

          <ul>
            {errorMessages.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <FormField>
        <TextField
          label={t("auth.username")}
          type="text"
          value={values.name}
          onChange={handleNameChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
          autoComplete="username"
          aria-invalid={Boolean(errors.name)}
        />
      </FormField>

      <FormField>
        <PasswordField
          label={t("auth.password")}
          value={values.password}
          onChange={handlePasswordChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
        />
      </FormField>

      {loginError && (
        <div
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className={styles.loginError}
        >
          {loginError}
        </div>
      )}

      <FormActions>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? t("auth.loggingIn") : t("auth.login")}
        </Button>
      </FormActions>
    </form>
  );
};
