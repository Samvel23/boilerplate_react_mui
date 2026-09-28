import { useCallback, useMemo, useState, type ReactNode } from "react";

import { Alert, Snackbar, type AlertColor } from "@mui/material";

import { ToastContext } from "./ToastContext";

import styles from "./ToastProvider.module.scss";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const showToast = useCallback(
    (nextMessage: string, nextSeverity: AlertColor = "info") => {
      setMessage(nextMessage);
      setSeverity(nextSeverity);
      setOpen(true);
    },
    [],
  );

  const handleClose = () => {
    setOpen(false);
  };

  const value = useMemo(
    () => ({
      showToast,
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        className={styles.snackbar}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          className={styles.alert}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
