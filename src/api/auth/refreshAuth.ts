import axios from "axios";

export interface IRefreshAuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface IRefreshAuthRequest {
  refreshToken: string;
  expiresInMins: number;
}

export const refreshAuth = (refreshToken: string) => {
  const payload: IRefreshAuthRequest = {
    refreshToken,
    expiresInMins: 1,
  };

  return axios.post<IRefreshAuthResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    payload,
  );
};
