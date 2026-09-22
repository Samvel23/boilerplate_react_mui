import { useState, type FormEvent } from "react";

import {
  AppButton,
  FormField,
  FormActions,
  AppTextField,
  PasswordField,
} from "@/components";

import type { ILoginFormValues } from "@/types/forms";

import { validateEmail, validatePassword } from "@/utils/validation";

import styles from "./LoginForm.module.scss";

export interface ILoginFormProps {
  onSubmit?: (values: ILoginFormValues) => void;
}

interface ILoginFormErrors {
  email?: string;
  password?: string;
}

export const LoginForm = ({ onSubmit }: ILoginFormProps) => {
  const [values, setValues] = useState<ILoginFormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ILoginFormErrors>({});

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({
      ...current,
      email: event.target.value,
    }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({
      ...current,
      password: event.target.value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: ILoginFormErrors = {};

    const emailError = validateEmail(values.email);

    if (emailError) {
      nextErrors.email = emailError;
    }

    const passwordError = validatePassword(values.password);

    if (passwordError) {
      nextErrors.password = passwordError;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit?.(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <FormField error={errors.email}>
        <AppTextField
          label="Email"
          type="email"
          value={values.email}
          onChange={handleEmailChange}
          error={Boolean(errors.email)}
          autoComplete="email"
        />
      </FormField>

      <FormField error={errors.password}>
        <PasswordField
          label="Password"
          value={values.password}
          onChange={handlePasswordChange}
          error={Boolean(errors.password)}
          autoComplete="current-password"
        />
      </FormField>

      <FormActions>
        <AppButton type="submit" variant="contained" size="large" fullWidth>
          Login
        </AppButton>
      </FormActions>
    </form>
  );
}
