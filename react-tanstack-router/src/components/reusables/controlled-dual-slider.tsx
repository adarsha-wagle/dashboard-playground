'use client'

import * as React from 'react'
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
} from '@/components/ui/form'

import { DualRangeSlider } from '@/components/ui/dual-slider'
import { cn } from '@/lib/utils'

type ControlledDualSliderProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  control: Control<T>
  defaultValue?: PathValue<T, Path<T>>
  min?: number
  max?: number
  step?: number
  className?: string
  required?: boolean
  labelPosition?: 'top' | 'bottom'
  valueLabel?: (value: number | undefined) => React.ReactNode
}

export function ControlledDualSlider<T extends FieldValues>({
  name,
  label,
  control,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  className,
  required = false,
  labelPosition = 'top',
  valueLabel,
}: ControlledDualSliderProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className={cn('w-full ', className)}>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <DualRangeSlider
              min={min}
              max={max}
              step={step}
              value={field.value as number[]}
              onValueChange={field.onChange}
              label={valueLabel}
              labelPosition={labelPosition}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
