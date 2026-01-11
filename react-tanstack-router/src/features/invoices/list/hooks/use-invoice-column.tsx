import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import OrganizationRowAction from '../components/invoice-row-actions'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import type { IInvoice } from '../../shared/invoice-type'
import { Badge } from '@/components/ui/badge'
import { statusColors } from '../../shared/utils'

export const useOrganizationColumns = () => {
  const columns: ColumnDef<IInvoice>[] = useMemo(
    () => [
      {
        accessorKey: 'invoiceNumber',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Invoice No." />
        ),
        cell: ({ row }) => <div>{row.getValue('invoiceNumber')}</div>,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'customer',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Customer" />
        ),
        cell: ({ row }) => <div>{row.getValue('customer')}</div>,
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
          return (
            <div className="flex space-x-2">
              <div>{description}</div>
            </div>
          )
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
        enableSorting: true, // Enable sorting
        enableHiding: false,
      },
      {
        accessorKey: 'dueDate',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Due Date" />
        ),
        cell: ({ row }) => <div>{row.original.dueDate}</div>,
        enableSorting: true, // Enable sorting
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
      },
      {
        id: 'actions',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => <OrganizationRowAction row={row} />,
        enableSorting: false,
      },
    ],
    [],
  )

  return columns
}
