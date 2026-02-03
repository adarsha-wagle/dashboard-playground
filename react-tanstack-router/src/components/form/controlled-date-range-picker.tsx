import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { type Control, type FieldValues, type Path } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '../../lib/utils'

type ControlledDateRangePickerProps<T extends FieldValues> = {
  fromName: Path<T>
  toName: Path<T>
  label: string
  control: Control<T>
  className?: string
  required?: boolean
}

export function ControlledDateRangePicker<T extends FieldValues>({
  fromName,
  toName,
  label,
  control,
  className,
  required = false,
}: ControlledDateRangePickerProps<T>) {
  return (
    <FormItem className={cn('w-full', className)}>
      <FormLabel>
        {label}
        {required && <span className="ml-1 text-pink-400">*</span>}
      </FormLabel>

      {/* FROM FIELD */}
      <FormField
        control={control}
        name={fromName}
        render={({ field: fromField, fieldState: fromState }) => (
          <FormField
            control={control}
            name={toName}
            render={({ field: toField, fieldState: toState }) => {
              const hasError = fromState.error || toState.error

              return (
                <>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'form-input!',
                            !fromField.value && 'text-muted-foreground',
                            hasError
                              ? 'border-red-500'
                              : 'border-gray-200 focus:border-yellow-400',
                          )}
                        >
                          {fromField.value ? (
                            toField.value ? (
                              <>
                                {format(fromField.value, 'LLL dd, y')} –{' '}
                                {format(toField.value, 'LLL dd, y')}
                              </>
                            ) : (
                              format(fromField.value, 'LLL dd, y')
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        className="form-content w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          autoFocus
                          mode="range"
                          numberOfMonths={2}
                          selected={{
                            from: fromField.value,
                            to: toField.value,
                          }}
                          onSelect={(range) => {
                            fromField.onChange(range?.from)
                            toField.onChange(range?.to)
                          }}
                          defaultMonth={fromField.value}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>

                  {(fromState.error || toState.error) && (
                    <FormMessage>
                      {fromState.error?.message || toState.error?.message}
                    </FormMessage>
                  )}
                </>
              )
            }}
          />
        )}
      />
    </FormItem>
  )
}
