import { useState, type FormEvent } from "react";

import {
  Button,
  FormField,
  FormActions,
  TextField,
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
  const [values, setValues] = useState<ILoginFormValues>({
    name: "emilys",
    password: "emilyspass",
  });

  const [errors, setErrors] = useState<ILoginFormErrors>({});

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({
      ...current,
      name: event.target.value,
    }));

    setErrors((current) => ({
      ...current,
      name: undefined,
    }));
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
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      const res = await loginAuth(values.name, values.password);

      const { accessToken, refreshToken, ...user } = res.data;

      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);

      useUserStore.getState().setUser(user);

      useUserStore.getState().setCredentials({
        accessToken,
        refreshToken,
      });

      onSubmit?.(values);
    } catch (error) {
      console.error("Login failed:", error);
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
          Please correct the following errors:
          <ul>
            {errorMessages.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <FormField>
        <TextField
          label="Username"
          type="text"
          value={values.name}
          onChange={handleNameChange}
          error={Boolean(errors.name)}
          autoComplete="username"
          aria-invalid={Boolean(errors.name)}
        />
      </FormField>

      <FormField>
        <PasswordField
          label="Password"
          value={values.password}
          onChange={handlePasswordChange}
          error={Boolean(errors.password)}
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
        />
      </FormField>

      <FormActions>
        <Button type="submit" variant="contained" size="large" fullWidth>
          Login
        </Button>
      </FormActions>
    </form>
  );
};
