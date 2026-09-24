import { apiClient } from "../client";

export const meAuth = () => {
  return apiClient.get("/auth/me");
};
