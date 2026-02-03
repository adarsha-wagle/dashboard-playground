import {
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form'
import { type HTMLProps } from 'react'
import { Calendar, X } from 'lucide-react'
import { format } from 'date-fns'

import { cn } from '../../lib/utils'

import { Button } from '../ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar as CalendarComponent } from '../ui/calendar'

type TControlledDatePickerProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  control: Control<T>
  defaultValue?: PathValue<T, Path<T>> | ''
  className?: HTMLProps<HTMLElement>['className']
  inputClassName?: HTMLProps<HTMLElement>['className']
  placeholder?: string
  required?: boolean
}

function ControlledDatePicker<T extends FieldValues>({
  name,
  label,
  control,
  inputClassName = '',
  className = '',
  placeholder = '',
}: TControlledDatePickerProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex w-full flex-col', className)}>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      'form-input! w-full',
                      field.value ? 'bg-primary/10!' : 'text-muted-foreground',
                      inputClassName,
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>{placeholder || 'Pick a date'}</span>
                    )}
                    <Calendar className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="form-content w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  autoFocus
                />
              </PopoverContent>
            </Popover>

            {field.value && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-8 h-full hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation()
                  field.onChange(null)
                }}
                aria-label="Clear date"
              >
                <X className="text-muted-foreground h-4 w-4" />
              </Button>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ControlledDatePicker
