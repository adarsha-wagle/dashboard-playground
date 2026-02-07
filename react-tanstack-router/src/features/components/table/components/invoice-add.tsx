import React, { memo } from 'react'
import { InvoiceForm } from './invoice-form'
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
import { ButtonPrimary } from '@/components/reusables/button-primary'
import { X } from 'lucide-react'

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
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      animation="morph"
      morphing
    >
      <DialogTrigger>
        <ButtonPrimary
          size="sm"
          className="text-secondary-lighter rounded-lg"
          onClick={() => setIsDialogOpen(true)}
        >
          Create Invoice
        </ButtonPrimary>
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl">
        <DialogClose>
          <X />
        </DialogClose>
        <DialogHeader className="px-0">
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Fill in invoice details and add line items.
          </DialogDescription>
        </DialogHeader>
        <InvoiceForm onSubmit={onSubmit} form={form} />
        {/* Footer */}
        <DialogFooter className="items-start pb-0">
          <ButtonPrimary
            type="submit"
            loadingText="Creating..."
            variant="destructive"
            className="bg-error-main px-6"
            onClick={() => setIsDialogOpen(false)}
          >
            Close
          </ButtonPrimary>
          <ButtonPrimary
            type="submit"
            className="px-8"
            isLoading={invoiceMutation.isPending}
            loadingText="Creating..."
          >
            Create
          </ButtonPrimary>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default memo(InvoiceAdd)
