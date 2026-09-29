import axios from "axios";

import {
  requestInterceptor,
  responseErrorInterceptor,
  responseInterceptor,
} from "@/api/interceptors";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(requestInterceptor);

apiClient.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor,
);
