import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '../ui/checkbox'
import { type Control, type FieldValues, type Path } from 'react-hook-form'

type ControlledCheckboxProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
}

export function ControlledCheckbox<T extends FieldValues>({
  control,
  name,
  label,
}: ControlledCheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-3">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="form-checkbox!"
            />
          </FormControl>
          <FormLabel>{label}</FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
