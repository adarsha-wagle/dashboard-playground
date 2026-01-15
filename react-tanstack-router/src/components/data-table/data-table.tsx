import { flexRender, type Table as TableType } from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { BookDashed } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { cn } from '@/lib/utils'

interface DataTableProps<TData> {
  loading: boolean
  table: TableType<TData>
  limit?: number
}

export function DataTable<TData>({
  loading,
  table,
  limit = 10,
}: DataTableProps<TData>) {
  return (
    <div
      className={cn(
        'rounded-md border no-scrollbar max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-full',
        limit >= 15 ? 'h-[65vh] xl:h-[70vh] overflow-auto' : '',
      )}
    >
      <Table className="table-fixed w-full">
        <TableHeader className="bg-accent sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    className="text-center truncate"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <>
              {Array.from({ length: limit }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {table.getAllLeafColumns().map((column) => (
                    <TableCell key={column.id} className="text-center ">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : table.getRowModel()?.rows?.length ? (
            table.getRowModel()?.rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-56 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <BookDashed />
                  <div>No results.</div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
