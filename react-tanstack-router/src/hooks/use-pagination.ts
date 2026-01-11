import { parseAsInteger, useQueryStates } from 'nuqs'
import { useCallback } from 'react'

type DefaultPagination = {
  limit: number
  page: number
}

export const usePagination = (params?: DefaultPagination) => {
  const { limit = 10, page = 1 } = params || {}
  const [pagination, setPagination] = useQueryStates(
    {
      limit: parseAsInteger.withDefault(limit),
      page: parseAsInteger.withDefault(page),
    },
    {
      history: 'replace',
    },
  )

  const setPrevPage = () => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }))
  }

  const setNextPage = useCallback(
    () =>
      setPagination((prev) => ({
        ...prev,
        page: prev.page + 1,
      })),
    [],
  )

  const setLimit = useCallback(
    (newLimit: number | string) =>
      setPagination((prev) => ({
        ...prev,
        limit: Number(newLimit),
        // reset page when changing limit
        page: 1,
      })),
    [],
  )

  const setPage = useCallback((newPage: number | string) => {
    setPagination((prev) => ({
      ...prev,
      page: Number(newPage),
    }))
  }, [])

  const resetPagination = useCallback(() => setPagination({ limit, page }), [])

  // const offset = useMemo(
  //   () => (pagination.page - 1) * pagination.limit,
  //   [pagination],
  // )

  return {
    pagination,
    setPagination,
    setNextPage,
    setPrevPage,
    setPage,
    setLimit,
    resetPagination,
  }
}
