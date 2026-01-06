import InvoiceList from '@/features/invoices/list'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/invoices/')({
  component: InvoiceList,
})
