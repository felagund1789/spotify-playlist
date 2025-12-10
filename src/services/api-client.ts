import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import getAccessToken from "./access-token";

class SpotifyApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.spotify.com/v1",
    });

    // Add request interceptor to include token
    this.client.interceptors.request.use(async (config) => {
      try {
        const token = await getAccessToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Failed to get access token:', error);
        throw error;
      }
      return config;
    });

    // Add response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token might be expired or invalid
          console.error('Unauthorized request, token might be invalid');
        }
        return Promise.reject(error);
      }
    );
  }

  // Expose the axios methods
  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<T>(url, config);
  }

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.post<T>(url, data, config);
  }

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.put<T>(url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<T>(url, config);
  }

  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.client.patch<T>(url, data, config);
  }
}

export default new SpotifyApiClient();
