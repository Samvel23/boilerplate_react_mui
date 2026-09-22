import type { AxiosError, AxiosResponse } from "axios";

export function responseInterceptor(response: AxiosResponse) {
  return response;
}

export function responseErrorInterceptor(error: AxiosError) {
  return Promise.reject(error);
}
