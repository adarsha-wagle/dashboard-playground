import { getCoreRowModel } from '@tanstack/react-table'
import { useReactTable } from '@tanstack/react-table'
import { useFilters } from '@/hooks/use-filters'
import { usePagination } from '@/hooks/use-pagination'
import { DataTable } from '@/components/data-table/data-table'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import { useOrganizationColumns } from '../hooks/use-invoice-column'
import { useGetPaginatedInvoices } from '../../shared/invoice-service'
import InvoiceFilters, { invoiceFilterOptions } from './invoice-filters'
import InvoiceAdd from './invoice-add'
import { useMemo } from 'react'
import { useSorting } from '@/hooks/use-sorting'

const SectionInvoiceTableList = () => {
  const roleColumns = useOrganizationColumns()
  const paginationOptions = usePagination()
  const sortingOptions = useSorting()

  const { sortBy, sortOrder } = sortingOptions

  const filterOptions = useFilters(invoiceFilterOptions)
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

  return (
    <section className="container flex justify-center items-center my-8">
      <div className="max-w-7xl w-full">
        <div>
          <DataTableToolbar table={table}>
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
              <InvoiceFilters filterOptions={filterOptions} />
            </div>
            <InvoiceAdd />
          </DataTableToolbar>
        </div>
        <div className="mt-4">
          <DataTable loading={isFetching || isLoading} table={table} />
        </div>
        <div className="mt-4">
          <DataTablePagination
            paginationOptions={paginationOptions}
            metadata={data?.metadata}
          />
        </div>
      </div>
    </section>
  )
}

export default SectionInvoiceTableList
