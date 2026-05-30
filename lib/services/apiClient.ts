import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// -----------------------------
// Axios Instance
// -----------------------------
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// -----------------------------
// Response Interceptor
// -----------------------------
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const message =
      error?.response?.data?.message || "Something went wrong";

    console.error("API Error:", message);

    return Promise.reject(error);
  }
);

// -----------------------------
// Generic Response Type
// -----------------------------
export type ApiResponse<T> = AxiosResponse<T>;

// -----------------------------
// API CLIENT WRAPPER
// -----------------------------
export const apiClient = {
  get: <T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return api.get<T>(url, { params, ...config });
  },

  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return api.post<T>(url, data, config);
  },

  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return api.put<T>(url, data, config);
  },

  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return api.patch<T>(url, data, config);
  },

  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return api.delete<T>(url, config);
  },
};

export default api;