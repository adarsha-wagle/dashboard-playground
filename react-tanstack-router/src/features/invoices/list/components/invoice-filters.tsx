// invoice-filters.tsx
import { type FC, useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useFilters } from '@/hooks/use-filters'
import { X } from 'lucide-react'
import { cleanObj } from '@/lib/utils'
import { parseAsString } from 'nuqs'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'

type InvoiceFiltersProps = {
  filterOptions: ReturnType<typeof useFilters>
}

const InvoiceFilters: FC<InvoiceFiltersProps> = ({ filterOptions }) => {
  const { filters, resetFilters, setFilterValue } = filterOptions

  const [search, setSearch] = useState<string>(
    (filters?.search as string) || '',
  )

  const debouncedSearch = useDebounce(search, 300)

  const isFilterApplied = !!Object.keys(cleanObj(filters)).length

  const handleReset = useCallback(() => {
    resetFilters()
  }, [resetFilters])

  useEffect(() => {
    if (debouncedSearch.trim()) {
      setFilterValue('search', debouncedSearch)
    } else {
      // Clear the search filter when input is empty
      setFilterValue('search', null)
    }
  }, [debouncedSearch, setFilterValue])

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          type="text"
          placeholder="Search Invoice..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isFilterApplied && (
          <Button
            variant="ghost"
            onClick={handleReset}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default InvoiceFilters

export const invoiceFilterOptions = {
  search: parseAsString,
}
