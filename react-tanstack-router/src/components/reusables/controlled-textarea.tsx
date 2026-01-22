import {
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form'
import { type HTMLProps } from 'react'

import { cn } from '@/lib/utils'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Textarea } from '../ui/textarea'
import { InputGroup, InputGroupTextarea } from '../ui/input-group'

type TControlledTextAreaFieldProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  control: Control<T>
  defaultValue?: PathValue<T, Path<T>> | ''
  className?: HTMLProps<HTMLElement>['className']
  textareaClassName?: HTMLProps<HTMLTextAreaElement>['className']
  placeholder?: string
  required?: boolean
  rows?: number
}

function ControlledTextAreaField<T extends FieldValues>({
  name,
  label,
  control,
  defaultValue = '',
  textareaClassName = '',
  className = '',
  placeholder = '',
  required = false,
  rows = 4,
}: TControlledTextAreaFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputGroup className="form-input! w-full">
              <InputGroupTextarea
                {...field}
                placeholder={placeholder}
                defaultValue={defaultValue}
                required={required}
                rows={rows}
                className={cn(textareaClassName)}
              />
            </InputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ControlledTextAreaField
