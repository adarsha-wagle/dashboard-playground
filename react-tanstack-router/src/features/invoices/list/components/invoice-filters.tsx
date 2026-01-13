// invoice-filters.tsx
import { type FC, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useFilters } from '@/hooks/use-filters'
import { X } from 'lucide-react'
import { cleanObj } from '@/lib/utils'
import { parseAsString } from 'nuqs'
import SearchInput from '@/components/reusables/search-input'

type InvoiceFiltersProps = {
  filterOptions: ReturnType<typeof useFilters>
}

const InvoiceFilters: FC<InvoiceFiltersProps> = ({ filterOptions }) => {
  const { filters, resetFilters, setFilterDebounce } = filterOptions

  const isFilterApplied = !!Object.keys(cleanObj(filters)).length

  const handleReset = useCallback(() => {
    resetFilters()
  }, [resetFilters])

  const handleSearchChange = (value: string) => {
    setFilterDebounce('search', value)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <SearchInput
          handleSearchChange={handleSearchChange}
          initialValue={(filters.search as string) || ''}
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
