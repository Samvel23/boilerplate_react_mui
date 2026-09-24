import { useState, type FormEvent } from "react";

import {
  Button,
  FormField,
  FormActions,
  AppTextField,
  PasswordField,
} from "@/components";

import type { ILoginFormValues } from "@/types/forms";

import { validateName, validatePassword } from "@/utils/validation";

import styles from "./LoginForm.module.scss";
import { loginAuth } from "@/api/auth/loginAuth";
import { useUserStore } from "@/stores/useUserStore";

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
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({
      ...current,
      password: event.target.value,
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

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <FormField error={errors.name}>
        <AppTextField
          label="Username"
          type="text"
          value={values.name}
          onChange={handleNameChange}
          error={Boolean(errors.name)}
          autoComplete="username"
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
        <Button type="submit" variant="contained" size="large" fullWidth>
          Login
        </Button>
      </FormActions>
    </form>
  );
};
