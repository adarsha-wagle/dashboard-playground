'use client'

import {
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
  type PathValue,
  Controller,
  get,
} from 'react-hook-form'
import { type HTMLProps } from 'react'

import { cn } from '@/lib/utils'

import { Label } from '../ui/label'
import { Input } from '../ui/input'

type TControlledInputFieldProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  control: Control<T>
  errors: FieldErrors<T>
  type?: 'text' | 'number' | 'password' | 'email' | 'date'
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
  errors,
  type = 'text',
  defaultValue = '',
  inputClassName = '',
  className = '',
  placeholder = '',
  required = false,
}: TControlledInputFieldProps<T>) {
  const errorMessage = get(errors, name)?.message
  const uniqueId = `${name}-input`
  const labelId = `${uniqueId}-label`

  return (
    <div className={cn('w-full', className)}>
      <Label id={labelId} htmlFor={uniqueId}>
        {label}
        {required && <span className="text-red-400 text-xs"> *</span>}
      </Label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as PathValue<T, Path<T>>}
        render={({ field }) => (
          <>
            <Input
              {...field}
              id={uniqueId}
              type={type}
              placeholder={placeholder}
              className={cn('mt-2 border-2 h-11.5', inputClassName)}
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
              required={required}
              aria-invalid={!!errorMessage}
              aria-labelledby={labelId}
              aria-describedby={errorMessage ? `${uniqueId}-error` : undefined}
            />

            {errorMessage && (
              <span
                id={`${uniqueId}-error`}
                className="text-xs text-red-400 pl-2"
                role="alert"
              >
                {errorMessage as string}
              </span>
            )}
          </>
        )}
      />
    </div>
  )
}

export default ControlledInputField
