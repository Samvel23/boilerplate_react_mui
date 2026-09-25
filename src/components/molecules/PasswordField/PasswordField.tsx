import { useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { IconButton, TextField, type TTextFieldProps } from "@/components";

export type TPasswordFieldProps = Omit<TTextFieldProps, "type">;

export const PasswordField = ({ slotProps, ...props }: TPasswordFieldProps) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((current) => !current);
  };

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={toggleVisibility}
                edge="end"
                aria-label={visible ? "Hide password" : "Show password"}
              >
                {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
