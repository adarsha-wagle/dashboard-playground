import { useFieldArray, type UseFormReturn } from 'react-hook-form'
import { Plus, Trash2, Package, User, FileText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import ControlledInputField from '@/components/form/controlled-input-field'
import ControlledDatePicker from '@/components/form/controlled-date-picker'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Form } from '@/components/ui/form'

export type InvoiceItem = {
  item: string
  qty: number
  price: number
}

export type TInvoiceSchema = {
  customer: string
  date: string
  dueDate: string
  items: InvoiceItem[]
}

type TInvoiceFormProps = {
  onSubmit: (data: TInvoiceSchema) => void
  form: UseFormReturn<TInvoiceSchema>
}

export function InvoiceForm({ onSubmit, form }: TInvoiceFormProps) {
  const { control, handleSubmit, watch } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  // Calculate totals
  const items = watch('items') || []

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="col-span-2 space-y-6">
        {/* Customer & Dates Section */}
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <ControlledInputField
              control={control}
              name="customer"
              label="Customer Name"
              placeholder="Enter customer name"
              className="sm:col-span-1"
            />
            <ControlledDatePicker
              control={control}
              name="date"
              label="Invoice Date"
              placeholder="Select date"
            />
            <ControlledDatePicker
              control={control}
              name="dueDate"
              label="Due Date"
              placeholder="Select due date"
            />
          </div>
        </div>

        <Separator className="bg-border/60" />

        {/* Line Items Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-end">
            <span className="text-muted-foreground text-xs">
              {fields.length} item{fields.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Items Header - Desktop */}
          <div className="bg-muted/40 text-muted-foreground hidden gap-3 rounded-lg px-3 py-2 text-xs font-medium tracking-wide uppercase sm:grid sm:grid-cols-12">
            <div className="col-span-5">Description</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-3 text-center">Price</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {fields.length === 0 ? (
              <div className="border-border/60 bg-muted/20 flex flex-col items-center justify-center rounded-lg border border-dashed px-4 py-8">
                <FileText className="text-muted-foreground/40 mb-2 h-8 w-8" />
                <p className="text-muted-foreground text-sm">
                  No items added yet
                </p>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={() => append({ item: '', qty: 1, price: 0 })}
                  className="text-primary mt-1"
                >
                  Add your first item
                </Button>
              </div>
            ) : (
              fields.map((field, index) => {
                const qty = items[index]?.qty || 0
                const price = items[index]?.price || 0
                const lineTotal = qty * price

                return (
                  <div
                    key={field.id}
                    className={cn(
                      'group border-border/50 bg-card/50 relative grid gap-3 rounded-lg border p-3',
                      'hover:border-border transition-all duration-200 hover:shadow-sm',
                      'sm:grid-cols-12 sm:items-end',
                    )}
                  >
                    {/* Item Description */}
                    <div className="sm:col-span-5">
                      <ControlledInputField
                        control={control}
                        name={`items.${index}.item`}
                        label={index === 0 ? 'Item' : ''}
                        placeholder="Item description"
                      />
                      <span className="text-muted-foreground mt-1 text-xs sm:hidden">
                        Description
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="sm:col-span-2">
                      <ControlledInputField
                        control={control}
                        name={`items.${index}.qty`}
                        type="number"
                        placeholder="0"
                      />
                      <span className="text-muted-foreground mt-1 text-xs sm:hidden">
                        Quantity
                      </span>
                    </div>

                    {/* Price */}
                    <div className="sm:col-span-3">
                      <ControlledInputField
                        control={control}
                        name={`items.${index}.price`}
                        type="number"
                        placeholder="0.00"
                      />
                      <span className="text-muted-foreground mt-1 text-xs sm:hidden">
                        Unit Price
                      </span>
                    </div>

                    {/* Line Total & Delete */}
                    <div className="flex items-center justify-between gap-2 sm:col-span-2 sm:justify-end">
                      <span className="text-foreground text-sm font-medium tabular-nums">
                        ${lineTotal.toFixed(2)}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className={cn(
                          'text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 h-8 w-8',
                          'opacity-60 transition-opacity group-hover:opacity-100',
                        )}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Add Item Button */}
          {fields.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ item: '', qty: 1, price: 0 })}
              className="border-border/60 text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/30 w-full border-dashed"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}

export default InvoiceForm
