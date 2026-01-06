'use client'

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
import { type IApiErrorResponse } from '@/types/api'

// Generic query hook with error handling
export const useApiQuery = <TData, TError = AxiosError>(
  key: QueryKey,
  url: string,
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<TData, TError>({
    queryKey: key,
    queryFn: async (): Promise<TData> => {
      try {
        const response = await api.get<TData>(url)
        return response.data
      } catch (err) {
        throw err
      }
    },
    ...options,
  })
}

// Mutation hook
export const useApiMutation = <
  TData = unknown,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
  TError = AxiosError<IApiErrorResponse>,
  TContext = unknown,
>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options?: UseMutationOptions<TData, TError, TVariables, TContext> & {
    invalidateQueries?: QueryKey[]
    appendIdToUrl?: boolean
  },
) => {
  const queryClient = useQueryClient()

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (data: TVariables): Promise<TData> => {
      let requestUrl = url
      let payload = data

      const response = await api[
        method.toLowerCase() as 'post' | 'put' | 'patch' | 'delete'
      ](requestUrl, method === 'DELETE' ? undefined : payload)

      return response.data
    },
    ...options,
    onSuccess: (...args) => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey })
        })
      }
      options?.onSuccess?.(...args)
    },
    onError: (...args) => {
      options?.onError?.(...args)
    },
  })
}
