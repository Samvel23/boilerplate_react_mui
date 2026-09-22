import { useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
  AppIconButton,
  AppTextField,
  type TAppTextFieldProps,
} from "@/components";

export interface IPasswordFieldProps extends Omit<TAppTextFieldProps, "type"> {}

export const PasswordField = ({ slotProps, ...props }: IPasswordFieldProps) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((current) => !current);
  };

  return (
    <AppTextField
      {...props}
      type={visible ? "text" : "password"}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          endAdornment: (
            <InputAdornment position="end">
              <AppIconButton
                onClick={toggleVisibility}
                edge="end"
                aria-label={visible ? "Hide password" : "Show password"}
              >
                {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </AppIconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
