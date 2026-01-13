import { getDebouncer } from '@/lib/utils'
import { type SingleParserBuilder, useQueryStates } from 'nuqs'
import { useCallback, useMemo } from 'react'

export type FilterValues =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | null

export type InitFilters = {
  [key: string]:
    | SingleParserBuilder<string>
    | SingleParserBuilder<number>
    | SingleParserBuilder<boolean>
    | SingleParserBuilder<string[]>
    | SingleParserBuilder<number[]>
}

export const useFilters = (defaultFilters: InitFilters = {}) => {
  const [filters, setFilters] = useQueryStates(defaultFilters, {
    history: 'replace',
  })

  const {
    debounce: debounceFilterSetter,
    cancelDebounce: debounceFilterCanceller,
  } = useMemo(() => {
    return getDebouncer((key: string, value: FilterValues) => {
      setFilters({ [key]: value })
    }, 300)
  }, [setFilters])

  const setFilterValue = useCallback(
    (key: string, value: FilterValues) => {
      setFilters({ [key]: value })
    },
    [setFilters],
  )

  const setBulkFilterValues = useCallback(
    (filterValues: Record<string, FilterValues>) => {
      setFilters(filterValues)
    },
    [setFilters],
  )

  const removeFilter = useCallback(
    (key: string) => {
      debounceFilterCanceller()
      setFilters((prev) => ({
        ...prev,
        [key]: null,
      }))
    },
    [setFilters, debounceFilterCanceller],
  )

  const replaceFilter = useCallback(
    (oldKey: string, newKey: string, value: FilterValues) => {
      setFilters({
        [oldKey]: null,
        [newKey]: value,
      })
    },
    [setFilters],
  )

  const setFilterDebounce = useCallback(
    (key: string, value: FilterValues) => {
      debounceFilterSetter(key, value)
    },
    [debounceFilterSetter],
  )

  const resetFilters = useCallback(() => {
    setFilters(null)
  }, [setFilters])

  return {
    filters,
    setFilterValue,
    setBulkFilterValues,
    removeFilter,
    resetFilters,
    replaceFilter,
    setFilterDebounce,
  }
}
