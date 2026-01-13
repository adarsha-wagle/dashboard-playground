import Papa from 'papaparse'

import { type Table as TableType } from '@tanstack/react-table'

import InvoiceFilters from './invoice-filters'
import InvoiceAdd from './invoice-add'
import type { useFilters } from '@/hooks/use-filters'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface TInvoiceTableToolbarProps<TData> {
  table: TableType<TData>
  filterOptions: ReturnType<typeof useFilters>
}

function InvoiceTableToolbar<TData>({
  table,
  filterOptions,
}: TInvoiceTableToolbarProps<TData>) {
  function handleDownload() {
    const columns = table
      .getVisibleLeafColumns()
      .filter((col) => col.id !== 'actions')
    const rows = table.getRowModel().rows

    const data = rows.map((row) =>
      Object.fromEntries(columns.map((col) => [col.id, row.getValue(col.id)])),
    )

    const csv = Papa.unparse(data)

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'table-data.csv'
    link.click()
  }
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 ">
        <InvoiceFilters filterOptions={filterOptions} />
      </div>
      <DataTableViewOptions table={table} />
      <ButtonGroup onClick={handleDownload}>
        <Button variant="secondary">Download</Button>
        <ButtonGroupSeparator />
        <Button size="icon" variant="secondary">
          <Download />
        </Button>
      </ButtonGroup>
      <InvoiceAdd />
    </div>
  )
}

export default InvoiceTableToolbar
