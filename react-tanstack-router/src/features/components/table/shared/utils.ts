import type { HTMLProps } from 'react'
import type { TInvoiceStatus } from './invoice-type'

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const statusColors: Record<
  TInvoiceStatus,
  HTMLProps<HTMLElement>['className']
> = {
  Paid: 'bg-green-100 text-green-800 border-green-200',
  Unpaid: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Overdue: 'bg-red-100 text-red-800 border-red-200',
}
