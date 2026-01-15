import { Calendar, User, FileText, DollarSign } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { Skeleton } from '@/components/ui/skeleton'
import type { IInvoice } from '../../../components/table/shared/invoice-type'
import {
  formatCurrency,
  formatDate,
  statusColors,
} from '../../../components/table/shared/utils'

export const InvoiceCard = ({ invoice }: { invoice: IInvoice }) => {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">
              Invoice #{invoice.invoiceNumber}
            </CardTitle>
            <CardDescription className="text-xs">
              ID: {invoice.id}
            </CardDescription>
          </div>
          <Badge className={`${statusColors[invoice.status]} text-xs`}>
            {invoice.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Customer and Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3 text-gray-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Customer</p>
              <p className="font-medium text-sm truncate">{invoice.customer}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-3 h-3 text-gray-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Amount</p>
              <p className="font-bold text-sm">
                {formatCurrency(invoice.amount)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-gray-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-medium text-xs">{formatDate(invoice.date)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-gray-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500">Due Date</p>
              <p className="font-medium text-xs">
                {formatDate(invoice.dueDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        {invoice.description && (
          <div className="flex items-start gap-2">
            <FileText className="w-3 h-3 text-gray-500 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Description</p>
              <p className="text-xs text-gray-700">{invoice.description}</p>
            </div>
          </div>
        )}

        {/* Items Table */}
        <div>
          <h3 className="font-semibold text-sm mb-2">Items</h3>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-1.5 px-2 font-medium text-gray-700">
                    Item
                  </th>
                  <th className="text-right py-1.5 px-2 font-medium text-gray-700">
                    Qty
                  </th>
                  <th className="text-right py-1.5 px-2 font-medium text-gray-700">
                    Price
                  </th>
                  <th className="text-right py-1.5 px-2 font-medium text-gray-700">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {invoice.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-1.5 px-2">{item.item}</td>
                    <td className="py-1.5 px-2 text-right">{item.qty}</td>
                    <td className="py-1.5 px-2 text-right">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="py-1.5 px-2 text-right font-medium">
                      {formatCurrency(item.qty * item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const InvoiceCardSkeleton = () => {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Customer and Dates */}
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="flex items-start gap-2">
          <Skeleton className="w-3 h-3 rounded-full mt-0.5" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>

        {/* Items Table */}
        <div>
          <Skeleton className="h-4 w-12 mb-2" />
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-50 px-2 py-1.5">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
            <div className="divide-y">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="px-2 py-1.5 flex justify-between">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
