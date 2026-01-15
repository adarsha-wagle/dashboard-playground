'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { type Control, type FieldValues, type Path } from 'react-hook-form'

type ControlledSwitchProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  disabled?: boolean
}

export function ControlledSwitch<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: ControlledSwitchProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
