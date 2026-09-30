import type { InternalAxiosRequestConfig } from "axios";

import { useUserStore } from "@/stores/useUserStore";

export function requestInterceptor(config: InternalAxiosRequestConfig) {
  const accessToken = useUserStore.getState().credentials?.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}
