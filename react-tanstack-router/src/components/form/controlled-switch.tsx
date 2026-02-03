import { type Control, type FieldValues, type Path } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Switch } from '../ui/switch'

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
              className="form-switch!"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
