import { useUserStore } from "@/stores/useUserStore";
import type { InternalAxiosRequestConfig } from "axios";

export function requestInterceptor(config: InternalAxiosRequestConfig) {
  const accessToken = useUserStore.getState().credentials?.accessToken;

  console.log(accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}
