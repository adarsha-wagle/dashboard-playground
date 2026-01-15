import type { IFilterQuery } from '@/types/api'
import { z } from 'zod'

export const ItemSchema = z.object({
  item: z.string().min(1, 'Item name is required'),
  qty: z.coerce.number().positive('Quantity must be greater than 0'),
  price: z.coerce.number().nonnegative('Price cannot be negative'),
})

export const InvoiceSchema = z.object({
  customer: z.string().min(1, 'Customer is required'),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),

  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Due date must be in YYYY-MM-DD format'),

  description: z.string().optional(),

  items: z.array(ItemSchema).min(1, 'At least one item is required'),
})

export type TInvoiceSchema = z.infer<typeof InvoiceSchema>

export type TInvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue'

export interface IInvoice extends TInvoiceSchema {
  id: string
  invoiceNumber: string
  amount: number
  status: TInvoiceStatus
}

export interface IInvoiceFilter extends IFilterQuery {
  status?: TInvoiceStatus
  sortBy?: string
  minAmount?: number
  maxAmount?: number
  dateFrom?: string
  dateTo?: string
}
