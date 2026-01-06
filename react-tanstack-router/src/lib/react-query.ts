import { toast } from 'sonner'

import {
  QueryClient,
  QueryCache,
  MutationCache,
  type DefaultOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AppErrorHandler } from './app-error-handler'
import { type IApiErrorResponse } from '@/types/api'

// Default options for queries and mutations
const queryConfig: DefaultOptions = {
  queries: {
    retry: (failureCount: number, error: unknown) => {
      const axiosError = error as AxiosError<IApiErrorResponse>

      // Don't retry auth errors
      if (axiosError?.response?.status === 401) return false

      // Don't retry client errors (4xx)
      if (
        axiosError?.response?.status &&
        axiosError.response.status >= 400 &&
        axiosError.response.status < 500
      ) {
        return false
      }

      // Retry up to 3 times for network/server errors
      return failureCount < 3
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // previously cacheTime
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  },
  mutations: {
    retry: (failureCount: number, error: unknown) => {
      const axiosError = error as AxiosError<IApiErrorResponse>

      // Don't retry auth errors or client errors
      if (axiosError?.response?.status && axiosError.response.status < 500) {
        return false
      }

      return failureCount < 1
    },
  },
}

// Create QueryClient with global error handling
export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      const appError = AppErrorHandler.handleApiError(
        error as AxiosError<IApiErrorResponse>,
      )

      // Handle auth errors globally
      // if (AppErrorHandler.isAuthError(appError)) {
      //   useAuthStore.getState().setAccessToken(null);
      //   if (typeof window !== "undefined") {
      //     toast.error("Session expired. Please log in again.");
      //     window.location.href = "/auth/login";
      //   }
      // } else {
      //   toast.error(appError.message);
      // }
      if (!AppErrorHandler.isAuthError(appError)) {
        toast.error(appError.message)
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      const appError = AppErrorHandler.handleApiError(
        error as AxiosError<IApiErrorResponse>,
      )

      if (!AppErrorHandler.isAuthError(appError)) {
        // useAuthStore.getState().setAccessToken(null);
        // if (typeof window !== "undefined") {
        //   toast.error("Session expired. Please log in again.");
        //   window.location.href = "/auth/login";
        // }
        toast.error(appError.message)
      }
    },
  }),
})

// Clear all queries logout
export const clearQueriesOnLogout = (): void => {
  queryClient.clear()
}

// Query keys factory for better organization
export const queryKeys = {
  all: ['api'] as const,
  // users
  users: () => [...queryKeys.all, 'users'] as const,
  user: (id: string) => [...queryKeys.users(), id] as const,
  profile: () => [...queryKeys.users(), 'profile'] as const,
  // invoices
  invoices: () => [...queryKeys.all, 'invoices'] as const,
  khaja: (id: string) => [...queryKeys.invoices(), id] as const,
  randomKhaja: () => [...queryKeys.invoices(), 'random'] as const,
  invoicesList: (filter: string) =>
    [...queryKeys.invoices(), 'list', filter] as const,
  favoriteKhajaList: (filters: string) =>
    [...queryKeys.invoices(), 'favoriteList', filters] as const,

  postedKhajaList: (filters: string) =>
    [...queryKeys.invoices(), 'postedList', filters] as const,
} as const
