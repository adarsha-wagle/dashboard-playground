import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { type IApiErrorResponse, type IApiSuccessResponse } from '@/types/api'
import {
  getAccessToken,
  resetAuth,
  useAuthStore,
} from '@/features/auth/shared/use-auth-store'
import { CONFIG } from '@/config/constant'
import type { IAuthRespose } from '@/features/auth/shared/auth-type'

// Create axios instance
const api = axios.create({
  baseURL: CONFIG.API_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor attach access token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken()

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

    // Avoid refreshing the token if the request is for login or register endpoints
    const isAuthEndpoint =
      originalRequest.url?.includes('/login') ||
      originalRequest.url?.includes('/register') ||
      originalRequest.url?.includes('/refresh')

    // Handle token refresh for 401 errors
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true

      try {
        const response = await axios.post<
          IApiSuccessResponse<Omit<IAuthRespose, 'user'>>
        >(`${CONFIG.API_URL}/refresh`, {}, { withCredentials: true })

        const { accessToken: newAccessToken } = response.data.data

        useAuthStore.getState().resetAuth({
          accessToken: newAccessToken,
          isAuthenticated: true,
          isAuthError: false,
          isAuthLoading: false,
          isPreviousLoggedIn: true,
        })

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        }
        return api(originalRequest)
      } catch (refreshError) {
        console.error('Refresh Error', refreshError)
        resetAuth({
          isAuthError: true,
          isAuthLoading: false,
          isPreviousLoggedIn: false,
        })
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
