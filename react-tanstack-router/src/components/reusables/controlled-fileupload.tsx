'use client'

import * as React from 'react'
import { type Control, type FieldValues, type Path } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Upload, Image as ImageIcon } from 'lucide-react'

type ControlledFileUploadProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: string
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  required?: boolean
  className?: string
  inputClassName?: string
  placeholder?: string
}

export function ControlledFileUpload<T extends FieldValues>({
  name,
  control,
  label,
  accept = 'image/*',
  multiple = false,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 1,
  required = false,
  className,
  inputClassName,
  placeholder = 'Click or drag files to upload',
}: ControlledFileUploadProps<T>) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = React.useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>

          <FormControl>
            <div
              className={cn(
                'relative mt-2 rounded-xl border-2 border-dashed p-6 text-center transition-all cursor-pointer',
                dragOver ? 'border-primary bg-primary/5' : 'border-muted',
                'hover:border-primary',
              )}
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(false)

                const files = Array.from(e.dataTransfer.files)
                if (!validateFiles(files, multiple, maxFiles, maxSize)) return

                field.onChange(normalizeFiles(files, multiple, field.value))
              }}
            >
              <Input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? [])
                  if (!validateFiles(files, multiple, maxFiles, maxSize)) return

                  field.onChange(normalizeFiles(files, multiple, field.value))
                }}
              />

              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                {accept.includes('image') ? (
                  <ImageIcon className="h-8 w-8" />
                ) : (
                  <Upload className="h-8 w-8" />
                )}
                <p className="font-medium text-sm">{placeholder}</p>
                <p className="text-xs">
                  {multiple ? `${maxFiles} files max` : 'Single file'} ·{' '}
                  {formatFileSize(maxSize)}
                </p>
              </div>
            </div>
          </FormControl>

          <FilePreviewGrid
            value={field.value}
            onChange={field.onChange}
            multiple={multiple}
          />

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

import { X, Grip, File as FileIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type PreviewProps = {
  value: File | File[] | null
  multiple: boolean
  onChange: (val: File | File[] | null) => void
}

export function FilePreviewGrid({ value, multiple, onChange }: PreviewProps) {
  if (!value) return null

  const files = Array.isArray(value) ? value : [value]

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {files.map((file, idx) => {
        const isImage = file instanceof File && file.type.startsWith('image/')

        return (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-xl border bg-background shadow-sm hover:shadow-md transition"
          >
            {isImage ? (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="h-32 w-full object-cover"
              />
            ) : (
              <div className="flex h-32 flex-col items-center justify-center gap-2">
                <FileIcon className="h-6 w-6 text-muted-foreground" />
                <p className="text-xs truncate px-2">{file.name}</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                if (!multiple) return onChange(null)
                onChange(files.filter((_, i) => i !== idx))
              }}
              className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100 transition"
            >
              <X className="h-3 w-3" />
            </button>

            {multiple && (
              <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition">
                <Grip className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function validateFiles(
  files: File[],
  multiple: boolean,
  maxFiles: number,
  maxSize: number,
): boolean {
  if (!multiple && files.length > 1) {
    toast.error('Only one file allowed')
    return false
  }

  if (multiple && files.length > maxFiles) {
    toast.error(`Max ${maxFiles} files allowed`)
    return false
  }

  for (const file of files) {
    if (file.size > maxSize) {
      toast.error(`"${file.name}" exceeds size limit`)
      return false
    }
  }

  return true
}

function normalizeFiles(
  incoming: File[],
  multiple: boolean,
  previous?: File | File[] | null,
): File | File[] | null {
  if (!multiple) return incoming[0] ?? null

  const prev = Array.isArray(previous) ? previous : previous ? [previous] : []

  return [...prev, ...incoming]
}

function formatFileSize(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(1)} ${units[i]}`
}
