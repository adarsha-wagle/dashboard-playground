import { parseAsString } from 'nuqs'
import { useQueryStates } from 'nuqs'
import { useCallback } from 'react'

export type SortDirection = 'asc' | 'desc' | null

export const useSorting = () => {
  const [sorting, setSorting] = useQueryStates(
    {
      sortBy: parseAsString,
      sortOrder: parseAsString,
    },
    {
      history: 'replace',
    },
  )

  const setSortValue = useCallback(
    (column: string, direction: SortDirection) => {
      if (direction === null) {
        setSorting({ sortBy: null, sortOrder: null })
      } else {
        setSorting({ sortBy: column, sortOrder: direction })
      }
    },
    [setSorting],
  )

  const toggleSort = useCallback(
    (column: string) => {
      const currentColumn = sorting.sortBy
      const currentOrder = sorting.sortOrder as SortDirection

      if (currentColumn !== column) {
        // New column - start with asc
        setSorting({ sortBy: column, sortOrder: 'asc' })
      } else if (currentOrder === 'asc') {
        // Same column, asc -> desc
        setSorting({ sortBy: column, sortOrder: 'desc' })
      } else {
        // Same column, desc -> clear
        setSorting({ sortBy: null, sortOrder: null })
      }
    },
    [sorting.sortBy, sorting.sortOrder, setSorting],
  )

  const clearSort = useCallback(() => {
    setSorting({ sortBy: null, sortOrder: null })
  }, [setSorting])

  return {
    sortBy: sorting.sortBy || undefined,
    sortOrder: (sorting.sortOrder as SortDirection) || undefined,
    setSortValue,
    toggleSort,
    clearSort,
  }
}
