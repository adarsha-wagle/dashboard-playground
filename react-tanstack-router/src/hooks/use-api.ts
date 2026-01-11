import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import api from '@/lib/axios-instance'
import { type IApiErrorResponse, type IApiSuccessResponse } from '@/types/api'

// Generic query hook with error handling
type ApiResponse<T> = IApiSuccessResponse<T>

interface UseApiQueryOptions<
  TData,
  TError = AxiosError<IApiErrorResponse>,
> extends Omit<
  UseQueryOptions<ApiResponse<TData>, TError, TData>,
  'queryKey' | 'queryFn'
> {}

export const useApiQuery = <TData, TError = AxiosError<IApiErrorResponse>>(
  key: QueryKey,
  url: string,
  options?: UseApiQueryOptions<TData, TError>,
) => {
  const query = useQuery<ApiResponse<TData>, TError, TData>({
    queryKey: key,
    queryFn: async () => {
      const response = await api.get<ApiResponse<TData>>(url)
      return response.data
    },
    select: (data) => data.data, // Extract data from response wrapper

    ...options,
  })

  return query
}

interface UseApiMutationOptions<
  TData,
  TVariables extends Record<string, unknown>,
  TError = AxiosError<IApiErrorResponse>,
  TContext = unknown,
> extends UseMutationOptions<ApiResponse<TData>, TError, TVariables, TContext> {
  invalidateQueries?: QueryKey[]
  skipGlobalError?: boolean
}

export const useApiMutation = <
  TData = unknown,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
  TError = AxiosError<IApiErrorResponse>,
  TContext = unknown,
>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options?: UseApiMutationOptions<TData, TVariables, TError, TContext>,
) => {
  const queryClient = useQueryClient()

  // Determine if user provided custom error handler
  const hasCustomErrorHandler = !!options?.onError

  return useMutation<ApiResponse<TData>, TError, TVariables, TContext>({
    mutationFn: async (data: TVariables) => {
      const methodLower = method.toLowerCase() as
        | 'post'
        | 'put'
        | 'patch'
        | 'delete'

      const response = await api[methodLower]<ApiResponse<TData>>(
        url,
        method === 'DELETE' ? undefined : data,
      )

      return response.data
    },
    meta: {
      skipGlobalError: options?.skipGlobalError ?? false,
      hasCustomErrorHandler, // Flag to indicate if custom error handler exists
    },
    onSuccess: (data, variables, context, mutationContext) => {
      // Invalidate specified queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey })
        })
      }

      // Call the user-provided onSuccess if present
      options?.onSuccess?.(data, variables, context, mutationContext)
    },
    // Pass through the user's onError if provided
    onError: options?.onError,
    ...options,
  })
}
