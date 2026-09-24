export const validateName = (name: string) => {
  if (!name.trim()) {
    return "Username is required";
  }

  return "";
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  return undefined;
};
