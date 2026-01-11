import { type Table } from '@tanstack/react-table'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  children?: React.ReactNode
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  children,
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between gap-4">
      {children}
      <DataTableViewOptions table={table} />
    </div>
  )
}
