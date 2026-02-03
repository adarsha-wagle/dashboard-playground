import {
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form'
import { type HTMLProps, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { cn } from '../../lib/utils'

import { Button } from '../ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'

type TControlledInputFieldProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  control: Control<T>
  type?: 'text' | 'password' | 'date-picker' | 'email' | 'number'
  defaultValue?: PathValue<T, Path<T>> | ''
  className?: HTMLProps<HTMLElement>['className']
  inputClassName?: HTMLProps<HTMLElement>['className']
  placeholder?: string
  required?: boolean
}

function ControlledInputField<T extends FieldValues>({
  name,
  label = '',
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
        <FormItem className={cn('h-fit w-full', className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <InputGroup className="form-input! w-full">
              <InputGroupInput
                placeholder={placeholder}
                {...field}
                defaultValue={defaultValue}
                type={isPassword && showPassword ? 'text' : type}
                required={required}
                className={cn(inputClassName)}
              />
              {isPassword && (
                <InputGroupAddon align="inline-end" className="p-0">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="text-muted-foreground size-4" />
                    ) : (
                      <Eye className="text-muted-foreground size-4" />
                    )}
                  </Button>
                </InputGroupAddon>
              )}
            </InputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ControlledInputField
