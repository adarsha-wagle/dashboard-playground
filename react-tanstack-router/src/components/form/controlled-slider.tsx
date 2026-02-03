import {
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form'
import { Minus, Plus } from 'lucide-react'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

import { Slider } from '../ui/slider'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'

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
              {required && <span className="ml-1 text-pink-400">*</span>}
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
                    <TooltipContent className="&: border bg-transparent">
                      <span className="text-muted-foreground text-sm">
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
