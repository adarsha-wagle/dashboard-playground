import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { type IApiErrorResponse, type IApiSuccessResponse } from '@/types/api'
import { useAuthStore } from '@/features/auth/shared/use-auth-store'
import { CONFIG } from '@/config/constant'

// Auth types
export interface IAuthToken {
  accessToken: string
}
// Create axios instance
const api = axios.create({
  baseURL: CONFIG.API_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState()

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

// Response interceptor with enhanced error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<IApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Handle token refresh for 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await axios.post<IApiSuccessResponse<IAuthToken>>(
          `${CONFIG.API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        )

        const { accessToken: newAccessToken } = response.data.data
        useAuthStore.getState().setAccessToken(newAccessToken)
        useAuthStore.getState().setIsAuthenticated(true)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        }
        return api(originalRequest)
      } catch (refreshError) {
        useAuthStore.getState().setAccessToken(null)
        useAuthStore.getState().setIsAuthenticated(false)
        useAuthStore.getState().setUser(null)
        // if (typeof window !== "undefined") {
        //   window.location.href = "/auth/login";
        // }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
