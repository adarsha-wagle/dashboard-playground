import { type ColumnDef } from '@tanstack/react-table'
import OrganizationRowAction from '../components/invoice-row-actions'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import type { IInvoice } from '../../shared/invoice-type'
import { Badge } from '@/components/ui/badge'
import { statusColors } from '../../shared/utils'

export const useOrganizationColumns = () => {
  const columns: ColumnDef<IInvoice>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          ref={(el) => {
            if (el) el.indeterminate = table.getIsSomeRowsSelected()
          }}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
      size: 40, // optional: adjust column width
    },
    {
      accessorKey: 'invoiceNumber',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice No." />
      ),
      cell: ({ row }) => <div>{row.getValue('invoiceNumber')}</div>,
      enableSorting: false,
      enableHiding: false,
      size: 100,
    },
    {
      accessorKey: 'customer',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">{row.getValue('customer')}</div>
      ),
      enableSorting: true, // Enable sorting
      enableHiding: false,
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        const { description } = row.original
        return <div>{description}</div>
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => <div>{row.getValue('date')}</div>,
      enableSorting: false, // Enable sorting
      enableHiding: false,
      size: 80,
    },
    {
      accessorKey: 'dueDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Due Date" />
      ),
      cell: ({ row }) => <div>{row.original.dueDate}</div>,
      enableSorting: false, // Enable sorting
      size: 80,
    },
    {
      accessorKey: 'status',
      id: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div>
          <Badge className={`${statusColors[row.original.status]} text-xs`}>
            {row.original.status}
          </Badge>
        </div>
      ),
      enableSorting: false, // Enable sorting
      size: 80,
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => <OrganizationRowAction row={row} />,
      enableSorting: false,
      size: 80,
    },
  ]

  return columns
}
