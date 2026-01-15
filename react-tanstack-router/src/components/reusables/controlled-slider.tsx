'use client'

import * as React from 'react'
import {
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
  type FieldErrors,
  get,
} from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

type ControlledSliderProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  control: Control<T>
  defaultValue?: PathValue<T, Path<T>> | number
  className?: string
  required?: boolean
  min?: number
  max?: number
  step?: number
}

export function ControlledSlider<T extends FieldValues>({
  name,
  label,
  control,
  defaultValue = 50,
  className,
  required = false,
  min = 0,
  max = 100,
  step = 1,
}: ControlledSliderProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field }) => {
        const currentValue =
          typeof field.value === 'number' ? field.value : defaultValue

        const increment = () =>
          field.onChange(Math.min(currentValue + step, max))

        const decrement = () =>
          field.onChange(Math.max(currentValue - step, min))

        return (
          <FormItem className="space-y-2">
            <FormLabel>
              {label}
              {required && <span className="text-pink-400 ml-1">*</span>}
            </FormLabel>

            <FormControl>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={decrement}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <TooltipProvider>
                  <Tooltip open>
                    <TooltipTrigger asChild>
                      <Slider
                        value={[currentValue]}
                        onValueChange={(v) => field.onChange(v[0])}
                        min={min}
                        max={max}
                        step={step}
                        className={cn('w-full py-2 text-black', className)}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-transparent border &:">
                      <span className="text-sm text-muted-foreground">
                        {currentValue}
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={increment}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
