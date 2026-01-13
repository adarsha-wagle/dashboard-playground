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
import { resetAuth } from '@/features/auth/shared/use-auth-store'
import type { IInvoiceFilter } from '@/features/invoices/shared/invoice-type'

const queryConfig: DefaultOptions = {
  queries: {
    retry: (failureCount: number, error: unknown) => {
      const axiosError = error as AxiosError<IApiErrorResponse>

      // Don't retry auth errors or client errors (4xx)
      if (axiosError?.response?.status && axiosError.response.status < 500) {
        return false
      }

      // Retry up to 3 times for network/server errors
      return failureCount < 3
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  },
  mutations: {
    // Only retry on network errors, not server errors
    retry: (failureCount: number, error: unknown) => {
      const axiosError = error as AxiosError<IApiErrorResponse>

      // Only retry on network errors (no response)
      if (axiosError?.response) return false

      return failureCount < 1
    },
  },
}

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      // GLOBAL ERROR HANDLING - This runs when no custom error handler is provided
      const appError = AppErrorHandler.handleApiError(
        error as AxiosError<IApiErrorResponse>,
      )
      if (AppErrorHandler.isAuthError(appError)) {
        handleAuthError()
      } else {
        toast.error(appError.message)
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      // Check if skipGlobalError is explicitly set, default to false if not set
      const skipGlobalError = mutation.meta?.skipGlobalError ?? false

      // Check if user provided custom error handler via hasCustomErrorHandler flag
      const hasCustomErrorHandler =
        mutation.meta?.hasCustomErrorHandler ?? false

      // Skip global error handling if either condition is true
      if (skipGlobalError || hasCustomErrorHandler) return

      // GLOBAL ERROR HANDLING - This runs when no custom error handler is provided
      const appError = AppErrorHandler.handleApiError(
        error as AxiosError<IApiErrorResponse>,
      )

      if (AppErrorHandler.isAuthError(appError)) {
        handleAuthError()
        toast.error(appError.message)
      } else {
        toast.error(appError.message)
      }
    },
  }),
})

// Centralized auth error handler
function handleAuthError(): void {
  resetAuth({
    isRefreshing: false,
    isAuthError: true,
    isPreviousLoggedIn: false,
  })
}

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
  invoicesList: (filter?: IInvoiceFilter) =>
    [...queryKeys.invoices(), 'list', JSON.stringify(filter)] as const,
  favoriteKhajaList: (filters: string) =>
    [...queryKeys.invoices(), 'favoriteList', filters] as const,

  postedKhajaList: (filters: string) =>
    [...queryKeys.invoices(), 'postedList', filters] as const,
} as const
