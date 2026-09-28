import { useContext } from "react";

import { ToastContext } from "@/components/providers/ToastProvider/ToastContext";

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
};
