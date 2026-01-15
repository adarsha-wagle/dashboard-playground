'use client'

import { useFieldArray, type UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'

import ControlledInputField from '@/components/reusables/controlled-input-field'

import { type TInvoiceSchema } from '../shared/invoice-type'

type TInvoiceFormProps = {
  onSubmit: (data: TInvoiceSchema) => void
  form: UseFormReturn<TInvoiceSchema>
}

export function InvoiceForm({ onSubmit, form }: TInvoiceFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  console.log('Invoice Form Re-rendered')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Customer & Dates */}
      <div className="grid grid-cols-2 gap-4">
        <ControlledInputField
          control={control}
          name="customer"
          label="Customer"
          placeholder="Customer name"
          required
          errors={errors}
        />

        <ControlledInputField
          control={control}
          name="date"
          label="Invoice Date"
          type="date"
          required
          errors={errors}
        />

        <ControlledInputField
          control={control}
          name="dueDate"
          label="Due Date"
          type="date"
          required
          errors={errors}
        />
      </div>

      <ControlledInputField
        control={control}
        name="description"
        label="Description"
        placeholder="Optional description"
        errors={errors}
      />

      {/* Items */}
      <div className="space-y-4">
        <h3 className="font-semibold">Items</h3>

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-4 gap-3 items-end">
            <ControlledInputField
              control={control}
              name={`items.${index}.item`}
              label="Item"
              placeholder="Item name"
              required
              errors={errors}
            />

            <ControlledInputField
              control={control}
              name={`items.${index}.qty`}
              label="Qty"
              type="number"
              required
              errors={errors}
            />

            <ControlledInputField
              control={control}
              name={`items.${index}.price`}
              label="Price"
              type="number"
              required
              errors={errors}
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
  )
}
