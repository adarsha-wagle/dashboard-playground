import React from 'react'
import {
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { MultiSelect } from '../ui/multi-select' // standalone MultiSelect
import { cn } from '../../lib/utils'

// Generic option type with optional icon
export interface IMultiSelectOption {
  [key: string]: any

  icon?: React.ComponentType<{ className?: string }>
}

// Props with generics and TS-friendly typing
type ControlledMultiSelectFieldProps<
  T extends FieldValues,
  OptionType extends IMultiSelectOption = IMultiSelectOption,
> = {
  name: Path<T>
  label: string
  control: Control<T>
  options: OptionType[]
  defaultValue?: PathValue<T, Path<T>> | (string | number)[]
  placeholder?: string
  className?: string
  inputClassName?: string
  required?: boolean
  setKey?: keyof OptionType // which key to store as value
  showKey?: keyof OptionType // which key to display
}

export function ControlledMultiSelectField<
  T extends FieldValues,
  OptionType extends IMultiSelectOption = IMultiSelectOption,
>({
  name,
  label,
  control,
  options,
  placeholder = 'Select options',
  className = '',
  inputClassName = '',
  required = false,
  setKey = 'value' as keyof OptionType,
  showKey = 'label' as keyof OptionType,
}: ControlledMultiSelectFieldProps<T, OptionType>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={{ required: required ? `${label} is required` : undefined }}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel>
            {label}
            {required && <span className="ml-1 text-pink-400">*</span>}
          </FormLabel>

          <FormControl>
            <MultiSelect
              options={options.map((option) => ({
                ...option,
                value: option[setKey],
                label: option[showKey],
              }))}
              variant="default"
              onValueChange={field.onChange}
              placeholder={placeholder}
              className={cn('form-input! w-full', inputClassName)}
              maxCount={3}
              animation={0.2}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
