import React from 'react'
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
import {
  InvoiceSchema,
  type IInvoice,
  type TInvoiceSchema,
} from '../../shared/invoice-type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateInvoice } from '../../shared/invoice-service'
import { Edit } from 'lucide-react'

type InvoiceEditProps = {
  invoice: IInvoice
}

function InvoiceEdit({ invoice }: InvoiceEditProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const form = useForm<TInvoiceSchema>({
    resolver: zodResolver(InvoiceSchema),
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
      <DialogTrigger asChild>
        <Edit
          onClick={() => setIsDialogOpen(true)}
          className="cursor-pointer"
          size={16}
        />
      </DialogTrigger>

      <DialogContent className="max-w-3xl! w-full">
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
          <DialogDescription>
            Update invoice details and line items.
          </DialogDescription>
        </DialogHeader>

        <InvoiceForm form={form} onSubmit={onSubmit} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="danger">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={updateInvoiceMutation.isPending}>
            {updateInvoiceMutation.isPending ? 'Updating...' : 'Update Invoice'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InvoiceEdit
