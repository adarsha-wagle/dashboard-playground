import React from 'react'
import { InvoiceForm } from './invoice-form'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import {
  InvoiceSchema,
  type IInvoice,
  type TInvoiceSchema,
} from '../shared/invoice-type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateInvoice } from '../shared/invoice-service'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'

type InvoiceEditProps = {
  invoice: IInvoice
}

function InvoiceEdit({ invoice }: InvoiceEditProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const form = useForm<TInvoiceSchema>({
    resolver: zodResolver(InvoiceSchema) as any,
    defaultValues: invoice,
  })

  const updateInvoiceMutation = useCreateInvoice()

  // 🔑 Reset form when invoice changes or dialog opens
  React.useEffect(() => {
    if (isDialogOpen) {
      form.reset(invoice)
    }
  }, [invoice, isDialogOpen, form])

  const onSubmit = (data: TInvoiceSchema) => {
    updateInvoiceMutation.mutate(data, {
      onSuccess: () => {
        setIsDialogOpen(false)
      },
    })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Edit
          onClick={() => setIsDialogOpen(true)}
          className="cursor-pointer"
          size={16}
        />
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl!">
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
          <DialogDescription>
            Update invoice details and line items.
          </DialogDescription>
        </DialogHeader>

        <InvoiceForm form={form} onSubmit={onSubmit} />

        <div>
          <DialogClose>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={updateInvoiceMutation.isPending}>
            {updateInvoiceMutation.isPending ? 'Updating...' : 'Update Invoice'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InvoiceEdit
