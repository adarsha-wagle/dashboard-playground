import Papa from 'papaparse'
import { type Table as TableType } from '@tanstack/react-table'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

import InvoiceFilters from './invoice-filters'
import InvoiceAdd from './invoice-add'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { Download, Trash } from 'lucide-react'
import type { useFilters } from '@/hooks/use-filters'
import { input } from '@testing-library/user-event/dist/cjs/event/input.js'

interface TInvoiceTableToolbarProps<TData> {
  table: TableType<TData>
  filterOptions: ReturnType<typeof useFilters>
}

function InvoiceTableToolbar<TData extends { customer?: string }>({
  table,
  filterOptions,
}: TInvoiceTableToolbarProps<TData>) {
  const selectedRows = table
    .getRowModel()
    .rows.filter((row) => row.getIsSelected())
  const selectedCount = selectedRows.length

  const handleExport = () => {
    const columns = table
      .getVisibleLeafColumns()
      .filter((col) => col.id !== 'actions')
    const rowsToExport =
      selectedCount > 0 ? selectedRows : table.getRowModel().rows

    const data = rowsToExport.map((row) =>
      Object.fromEntries(columns.map((col) => [col.id, row.getValue(col.id)])),
    )

    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = selectedCount > 0 ? 'selected-rows.csv' : 'all-rows.csv'
    link.click()
  }

  const handleDeleteSelected = () => {
    if (selectedCount === 0) return

    // Optional: remove rows from selection
    selectedRows.forEach((row) => row.toggleSelected(false))

    // Collect names (or another field) of deleted rows
    const names = selectedRows.map(
      (row) => row.original.customer || row.getValue('customer'),
    )
    toast.success(`Deleted rows: ${names.join(', ')}`)
  }

  return (
    <div className="flex items-center justify-between gap-4 ">
      <div className="flex flex-1">
        <InvoiceFilters filterOptions={filterOptions} />
      </div>

      {/* Selected Rows Toolbar */}
      <AnimatePresence initial={false}>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-black/80 text-white p-2 rounded-2xl"
          >
            <div>{selectedCount} selected</div>

            <ButtonGroup onClick={handleExport}>
              <Button variant="secondary" size="sm">
                Export
              </Button>
              <ButtonGroupSeparator />
              <Button size="sm" variant="secondary">
                <Download />
              </Button>
            </ButtonGroup>

            <ButtonGroup onClick={handleDeleteSelected}>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
              <ButtonGroupSeparator />
              <Button size="sm" variant="destructive">
                <Trash />
              </Button>
            </ButtonGroup>
          </motion.div>
        )}
      </AnimatePresence>

      <DataTableViewOptions table={table} />
      <InvoiceAdd />

      {/* Default Export Button */}
      <ButtonGroup onClick={handleExport}>
        <Button variant="secondary">Export</Button>
        <ButtonGroupSeparator />
        <Button size="icon" variant="secondary">
          <Download />
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default InvoiceTableToolbar
