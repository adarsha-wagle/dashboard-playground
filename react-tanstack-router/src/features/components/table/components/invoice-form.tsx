'use client'

import { useFieldArray, type UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'

import ControlledInputField from '@/components/reusables/controlled-input-field'

import { type TInvoiceSchema } from '../shared/invoice-type'
import { Form } from '@/components/ui/form'
import ControlledDatePicker from '@/components/reusables/controlled-date-picker'
import ControlledTextAreaField from '@/components/reusables/controlled-textarea'

type TInvoiceFormProps = {
  onSubmit: (data: TInvoiceSchema) => void
  form: UseFormReturn<TInvoiceSchema>
}

export function InvoiceForm({ onSubmit, form }: TInvoiceFormProps) {
  const { control, handleSubmit } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Customer & Dates */}
        <div className="grid grid-cols-2 gap-4">
          <ControlledInputField
            control={control}
            name="customer"
            label="Customer"
            placeholder="Customer name"
            required
          />
          <ControlledDatePicker
            control={control}
            name="date"
            label="Invoice Date"
            required
          />{' '}
          <ControlledDatePicker
            control={control}
            name="date"
            label="Invoice Date"
            required
          />
          <ControlledInputField
            control={control}
            name="dueDate"
            label="Due Date"
            required
          />
        </div>

        <ControlledTextAreaField
          control={control}
          name="description"
          label="Description"
          placeholder="Optional description"
        />

        {/* Items */}
        <div className="space-y-4">
          <h3 className="font-semibold">Items</h3>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-4 items-end gap-3">
              <ControlledInputField
                control={control}
                name={`items.${index}.item`}
                label="Item"
                placeholder="Item name"
                required
              />

              <ControlledInputField
                control={control}
                name={`items.${index}.qty`}
                label="Qty"
                required
                type="number"
              />

              <ControlledInputField
                control={control}
                name={`items.${index}.price`}
                label="Price"
                type="number"
                required
              />

              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ item: '', qty: 1, price: 0 })}
          >
            + Add Item
          </Button>
        </div>
      </form>
    </Form>
  )
}
