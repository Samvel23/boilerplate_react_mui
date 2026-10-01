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

interface IRefreshCredentials {
  accessToken: string;
  refreshToken: string;
}

let refreshPromise: Promise<IRefreshCredentials> | null = null;

let isRedirectingToLogin = false;

const refreshAccessToken = async (
  refreshToken: string,
): Promise<IRefreshCredentials> => {
  if (!refreshPromise) {
    refreshPromise = refreshAuth(refreshToken)
      .then((response) => {
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        const currentCredentials = useUserStore.getState().credentials;

        if (
          !currentCredentials ||
          currentCredentials.refreshToken !== refreshToken
        ) {
          throw new Error("Authentication state changed during token refresh.");
        }

        const credentials = {
          accessToken,
          refreshToken: newRefreshToken,
        };

        useUserStore.getState().setCredentials(credentials);

        return credentials;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const handleRefreshFailure = () => {
  useUserStore.getState().removeCredentials();

  if (!isRedirectingToLogin) {
    isRedirectingToLogin = true;
    redirectToLogin();
  }
};

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
    handleRefreshFailure();

    return Promise.reject(error);
  }

  try {
    await refreshAccessToken(refreshToken);

    const currentCredentials = useUserStore.getState().credentials;

    if (!currentCredentials) {
      return Promise.reject(error);
    }

    return apiClient(originalRequest);
  } catch (refreshError) {
    handleRefreshFailure();

    return Promise.reject(refreshError);
  }
};
