import { apiClient } from "../client";

export const loginAuth = (username: string, password: string) => {
  return apiClient.post("/auth/login", {
    username,
    password,
    expiresInMins: 1,
  });
};
