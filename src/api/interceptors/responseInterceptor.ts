import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface ICustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export function responseInterceptor(response: AxiosResponse) {
  return response;
}

export function responseErrorInterceptor(error: AxiosError) {
  const originalRequest: ICustomAxiosRequestConfig | undefined = error.config;
  if (
    error.response?.status === 401 &&
    originalRequest &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    // try{}catch{} needed here, generate the new accessToken call setCredentials(..) from
    // store and retry original request
  }
}
