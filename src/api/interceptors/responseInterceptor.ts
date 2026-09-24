import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { apiClient } from "@/api/client";
import { refreshAuth } from "../auth/refreshAuth";
import { useUserStore } from "@/stores/useUserStore";
import { redirectToLogin } from "@/utils/auth/redirectToLogin";

interface ICustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<{
  accessToken: string;
  refreshToken: string;
}> | null = null;

export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

export const responseErrorInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config as ICustomAxiosRequestConfig | undefined;

  if (
    error.response?.status !== 401 ||
    !originalRequest ||
    originalRequest._retry
  ) {
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  const refreshToken = useUserStore.getState().credentials?.refreshToken;

  if (!refreshToken) {
    useUserStore.getState().removeCredentials();

    return Promise.reject(error);
  }

  try {
    if (!refreshPromise) {
      refreshPromise = refreshAuth(refreshToken)
        .then((response) => {
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          useUserStore.getState().setCredentials({
            accessToken,
            refreshToken: newRefreshToken,
          });

          return {
            accessToken,
            refreshToken: newRefreshToken,
          };
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    await refreshPromise;

    return apiClient(originalRequest);
  } catch (refreshError) {
    useUserStore.getState().removeCredentials();

    redirectToLogin();

    return Promise.reject(refreshError);
  }
};
