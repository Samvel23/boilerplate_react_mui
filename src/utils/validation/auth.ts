export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return "Please enter a valid email address";
  }

  return undefined;
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
