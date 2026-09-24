import axios from "axios";

export const refreshAuth = (refreshToken: string) => {
  return axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
    refreshToken,
    expiresInMins: 1,
  });
};
