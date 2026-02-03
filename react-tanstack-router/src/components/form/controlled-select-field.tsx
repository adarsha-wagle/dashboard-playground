import type { HTMLProps } from 'react'
import {
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

import { cn } from '../../lib/utils'

export interface ISelectOption {
  [key: string]: any
  icon?: React.ComponentType<{ className?: string }>
}

type ControlledSelectFieldProps<
  T extends FieldValues,
  OptionType extends ISelectOption,
> = {
  name: Path<T>
  label: string
  control: Control<T>
  options: OptionType[]
  defaultValue?: PathValue<T, Path<T>> | ''
  placeholder?: string
  className?: HTMLProps<HTMLDivElement>['className']
  inputClassName?: HTMLProps<HTMLElement>['className']
  required?: boolean
  setKey?: keyof OptionType // which key to store as value
  showKey?: keyof OptionType // which key to display
}

export function ControlledSelectField<
  T extends FieldValues,
  OptionType extends ISelectOption,
>({
  name,
  label,
  control,
  options,
  placeholder = 'Select an option',
  className = '',
  inputClassName = '',
  required = false,
  setKey = 'value' as keyof OptionType,
  showKey = 'label' as keyof OptionType,
}: ControlledSelectFieldProps<T, OptionType>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel>
            {label}
            {required && <span className="ml-1 text-pink-400">*</span>}
          </FormLabel>

          <FormControl>
            <Select
              {...field}
              onValueChange={field.onChange}
              defaultValue={field.value as string}
            >
              <SelectTrigger
                className={cn('form-input! w-full', inputClassName)}
              >
                <SelectValue
                  placeholder={placeholder}
                  className="py-2 pl-4 text-gray-950 capitalize"
                />
              </SelectTrigger>

              <SelectContent className="form-content">
                {options.map((option) => (
                  <SelectItem
                    key={String(option[setKey])}
                    value={String(option[setKey])}
                    className="responsive__fontsize17 font-afacad flex items-center gap-2 text-gray-950 capitalize"
                  >
                    {/* Render icon if exists */}
                    {option.icon && (
                      <option.icon className="h-4 w-4 text-gray-600" />
                    )}
                    {String(option[showKey])}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
