'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { type Control, type FieldValues, type Path } from 'react-hook-form'

type RadioOption = {
  [key: string]: string
}

type ControlledRadioGroupProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  options: RadioOption[]
}

export function ControlledRadioGroup<T extends FieldValues>({
  control,
  name,
  label,
  options,
}: ControlledRadioGroupProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-col gap-2"
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center gap-3"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
