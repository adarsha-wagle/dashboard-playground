import { useApiMutation, useApiQuery } from '@/hooks/use-api'
import type { IInvoice, IInvoiceFilter, TInvoiceSchema } from './invoice-type'
import { queryKeys } from '@/lib/react-query'
import { toast } from 'sonner'
import type {
  IApiErrorResponse,
  IApiSuccessResponse,
  IPaginationResult,
} from '@/types/api'
import type { AxiosError } from 'axios'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import api from '@/lib/axios-instance'

const buildInvoiceFilter = (filter: IInvoiceFilter): string => {
  // Build query parameters for base filter (without page)

  const baseParams: Record<string, string> = {
    limit: (filter?.limit ?? 18).toString(),
    page: (filter?.page ?? 1).toString(),
    ...(filter?.search ? { search: filter.search } : {}),
  }

  const params = new URLSearchParams({
    ...baseParams,
    ...(filter?.sortBy ? { sortBy: filter.sortBy } : {}),
    ...(filter?.sortOrder ? { sortOrder: filter.sortOrder } : {}),
    ...(filter?.status ? { status: filter.status } : {}),
    ...(filter?.minAmount ? { minAmount: filter.minAmount.toString() } : {}),
    ...(filter?.maxAmount ? { maxAmount: filter.maxAmount.toString() } : {}),
    ...(filter?.dateFrom ? { dateFrom: filter.dateFrom } : {}),
    ...(filter?.dateTo ? { dateTo: filter.dateTo } : {}),
  })
  return `/invoices?${params.toString()}`
}

export const useGetInfiniteInvoices = (
  filter: Partial<IInvoiceFilter> = {},
) => {
  const queryResult = useInfiniteQuery<
    IApiSuccessResponse<IPaginationResult<IInvoice>>,
    AxiosError<IApiErrorResponse>,
    IInvoice[]
  >({
    queryKey: queryKeys.invoicesList(filter),
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const response = await api.get<
        IApiSuccessResponse<IPaginationResult<IInvoice>>
      >(buildInvoiceFilter({ ...filter, page: pageParam as number }))

      return response.data
    },
    getNextPageParam: (lastPage) => {
      const { metadata } = lastPage.data
      return metadata.hasNext ? metadata.currentPage + 1 : undefined
    },
    select: (data) => data.pages.flatMap((page) => page.data.data),
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000,
  })

  return queryResult
}

export const useGetPaginatedInvoices = (filter: Partial<IInvoiceFilter>) => {
  const query = buildInvoiceFilter(filter)

  return useApiQuery<IPaginationResult<IInvoice>, IApiErrorResponse>(
    queryKeys.invoicesList(filter),
    query,
  )
}

export const useCreateInvoice = () => {
  return useApiMutation<IInvoice, TInvoiceSchema>('invoies', 'POST', {
    invalidateQueries: [queryKeys.invoices()],
    onSuccess: (data) => {
      toast.success(data.message)
    },
  })
}
