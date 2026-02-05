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
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Token refresh state management
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

// Request interceptor
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

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<IApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Avoid refreshing for auth endpoints
    const isAuthEndpoint =
      originalRequest.url?.includes('/login') ||
      originalRequest.url?.includes('/register') ||
      originalRequest.url?.includes('/refresh')

    // Handle 401 errors
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const response = await axios.post<
          IApiSuccessResponse<Omit<IAuthRespose, 'user'>>
        >(`${CONFIG.API_URL}/refresh`, {}, { withCredentials: true })

        const { accessToken: newAccessToken } = response.data.data

        useAuthStore.getState().resetAuth({
          accessToken: newAccessToken,
          isAuthenticated: true,
          isRefreshError: false,
          isRefreshing: false,
          isPreviousLoggedIn: true,
        })

        // Update the failed request's header
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        }

        // Process all queued requests with the new token
        processQueue(null, newAccessToken)

        return api(originalRequest)
      } catch (refreshError) {
        console.error('Refresh Error', refreshError)
        processQueue(refreshError as AxiosError, null)

        resetAuth({
          isRefreshError: true,
          isRefreshing: false,
          isPreviousLoggedIn: false,
        })

        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api
