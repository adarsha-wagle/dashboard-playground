import { getCoreRowModel } from '@tanstack/react-table'
import { useReactTable } from '@tanstack/react-table'
import { useFilters } from '@/hooks/use-filters'
import { usePagination } from '@/hooks/use-pagination'
import { DataTable } from '@/components/data-table/data-table'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import { useOrganizationColumns } from '../hooks/use-invoice-column'
import { useGetPaginatedInvoices } from '../../shared/invoice-service'
import { invoiceFilterOptions } from './invoice-filters'
import { useMemo } from 'react'
import { useSorting } from '@/hooks/use-sorting'
import InvoiceTableToolbar from './invoice-table-toolbar'

const SectionInvoiceTableList = () => {
  const paginationOptions = usePagination()
  const sortingOptions = useSorting()
  const filterOptions = useFilters(invoiceFilterOptions)
  const roleColumns = useOrganizationColumns()

  const { sortBy, sortOrder } = sortingOptions

  const { pagination } = paginationOptions
  const { data, isLoading, isFetching } = useGetPaginatedInvoices({
    limit: pagination.limit,
    page: pagination.page,
    search: (filterOptions.filters.search as string) || '',
    sortOrder: sortOrder,
    sortBy: sortBy,
  })

  const tableData = useMemo(() => data?.data ?? [], [data?.data])

  const table = useReactTable({
    data: tableData,
    columns: roleColumns,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: (updater) => {
      if (typeof updater === 'function') {
        const currentSorting =
          sortBy && sortOrder
            ? [{ id: sortBy, desc: sortOrder === 'desc' }]
            : []
        const newSorting = updater(currentSorting)

        if (newSorting.length === 0) {
          sortingOptions.clearSort()
        } else {
          const sort = newSorting[0]
          sortingOptions.setSortValue(sort.id, sort.desc ? 'desc' : 'asc')
        }
      }
    },
    state: {
      sorting:
        sortBy && sortOrder ? [{ id: sortBy, desc: sortOrder === 'desc' }] : [],
    },
  })

  console.log('Section Re-rendered', table)

  return (
    <section className="relative">
      <div>
        <InvoiceTableToolbar filterOptions={filterOptions} table={table} />
      </div>
      <div className="mt-4">
        <DataTable
          loading={isFetching || isLoading}
          table={table}
          limit={pagination.limit}
        />
      </div>
      <div className="mt-4">
        <DataTablePagination
          paginationOptions={paginationOptions}
          metadata={data?.metadata}
        />
      </div>
    </section>
  )
}

export default SectionInvoiceTableList
