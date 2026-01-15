import {
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form'
import { type HTMLProps, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

type TControlledInputFieldProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  control: Control<T>
  type?: 'text' | 'password' | 'date-picker' | 'email'
  defaultValue?: PathValue<T, Path<T>> | ''
  className?: HTMLProps<HTMLElement>['className']
  inputClassName?: HTMLProps<HTMLElement>['className']
  placeholder?: string
  required?: boolean
}

function ControlledInputField<T extends FieldValues>({
  name,
  label,
  control,
  type = 'text',
  defaultValue = '',
  inputClassName = '',
  className = '',
  placeholder = '',
  required = false,
}: TControlledInputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                {...field}
                defaultValue={defaultValue}
                type={isPassword && showPassword ? 'text' : type}
                required={required}
                className={cn(isPassword && 'pr-10', inputClassName)}
              />
              {isPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ControlledInputField
