import React, { memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { InvoiceForm } from './invoice-form'
import { Button } from '@/components/storybook'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { InvoiceSchema, type TInvoiceSchema } from '../shared/invoice-type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateInvoice } from '../shared/invoice-service'
import { DialogOverlay } from '@radix-ui/react-dialog'

const defaultValues: TInvoiceSchema = {
  customer: 'test',
  date: '',
  dueDate: '',
  description: 'testttee',
  items: [
    {
      item: 'teste',
      qty: 1,
      price: 0,
    },
  ],
}

function InvoiceAdd() {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)

  const form = useForm<TInvoiceSchema>({
    resolver: zodResolver(InvoiceSchema) as any,
    defaultValues,
  })

  const invoiceMutation = useCreateInvoice()

  const onSubmit = (data: TInvoiceSchema) => {
    console.log('form submitted ', data)
  }

  console.log('Invoice Re-rendering')

  return (
    <AnimatePresence>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="flex justify-end">
            <Button size="small" className="bg-black!">
              Create Invoice
            </Button>
          </div>
        </DialogTrigger>

        <DialogContent className="w-full max-w-3xl!">
          <DialogOverlay />
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
            <DialogDescription>
              Fill in invoice details and add line items.
            </DialogDescription>
          </DialogHeader>
          <InvoiceForm onSubmit={onSubmit} form={form} />
          {/* Footer */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="danger">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={invoiceMutation.isPending}>
              {invoiceMutation.isPending ? 'Creating...' : 'Create Invoice'}
            </Button>
          </DialogFooter>{' '}
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  )
}

export default memo(InvoiceAdd)
