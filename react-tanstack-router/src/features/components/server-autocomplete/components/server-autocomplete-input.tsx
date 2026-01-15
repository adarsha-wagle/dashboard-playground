import { useState, useMemo } from 'react'
import { type Control, type FieldValues, type Path } from 'react-hook-form'
import { useCombobox } from 'downshift'
import { Search, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { IPaginationResult } from '@/types/api'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/use-debounce'

// Generic types
interface AutocompleteItem {
  id: string | number
  [key: string]: any
}

interface UseQueryResult<TData, TError> {
  data?: TData
  isLoading: boolean
  isError: boolean
  error?: TError
  refetch: () => void
}

interface ServerAutocompleteProps<
  T extends FieldValues,
  TItem extends AutocompleteItem,
  TFilter extends Record<string, any>,
> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder: string
  useQueryHook: (
    filter: Partial<TFilter>,
  ) => UseQueryResult<IPaginationResult<TItem>, any>
  displayField: keyof TItem
  secondaryField?: keyof TItem
  setKey: keyof TItem
  onSelect?: (item: TItem | null) => void
  disabled?: boolean
  required?: boolean
  additionalFilters?: Partial<TFilter>
  className?: string
}

export const ServerAutocompleteInput = <
  T extends FieldValues,
  TItem extends AutocompleteItem,
  TFilter extends Record<string, any>,
>({
  control,
  name,
  label,
  placeholder,
  useQueryHook,
  displayField,
  secondaryField,
  setKey = 'id',
  onSelect,
  disabled = false,
  required = false,
  additionalFilters = {},
  className = '',
}: ServerAutocompleteProps<T, TItem, TFilter>) => {
  const [inputValue, setInputValue] = useState<string>('')

  const debouncedSearch = useDebounce(inputValue, 300)
  // Build filter for the query hook
  const filter: Partial<TFilter> = {
    ...additionalFilters,
    limit: 10,
    page: 1,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  } as Partial<TFilter>

  // Use the provided query hook - only fetch when needed
  const { data, isLoading, isError } = useQueryHook(filter)

  const items = useMemo(() => {
    if (!data) return []
    return data.data
  }, [data?.data])

  return (
    <div className={cn('w-full', className)}>
      <FormField
        control={control}
        name={name}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field: { onChange, value } }) => {
          const {
            isOpen,
            getToggleButtonProps,
            getLabelProps,
            getMenuProps,
            getInputProps,
            highlightedIndex,
            getItemProps,
            selectItem,
          } = useCombobox({
            items,
            itemToString: (item) => (item ? String(item[displayField]) : ''),
            onSelectedItemChange: ({ selectedItem }) => {
              // If setKey is specified, only store that field's value
              // Otherwise store the entire item
              const selectedValue =
                selectedItem && setKey ? selectedItem[setKey] : selectedItem

              onChange(selectedValue)
              onSelect?.(selectedItem || null)
            },
            onInputValueChange: ({ inputValue }) => {
              setInputValue(inputValue || '')
            },
          })

          return (
            <FormItem>
              <FormLabel {...getLabelProps()}>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <div className="relative">
                    <Input
                      {...getInputProps({
                        disabled,
                      })}
                      placeholder={placeholder}
                    />

                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {isLoading && (
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                      )}

                      {value && !disabled && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            selectItem(null)
                            setInputValue('')
                            onChange(null)
                          }}
                          className="p-1 hover:bg-muted rounded transition"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}

                      {!disabled && (
                        <button
                          type="button"
                          {...getToggleButtonProps()}
                          className="p-1 hover:bg-muted rounded transition"
                        >
                          <Search className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>

                  <ul
                    {...getMenuProps()}
                    className={cn(
                      'absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-auto scrollbar-thin',
                      !(isOpen && items.length) && 'hidden',
                    )}
                  >
                    {isOpen && !isLoading && items.length === 0 && (
                      <li className="px-4 py-3 text-sm text-muted-foreground text-center">
                        No results found
                      </li>
                    )}

                    {isOpen &&
                      items.map((item, index) => (
                        <li
                          key={item.id}
                          {...getItemProps({ item, index })}
                          className={cn(
                            'px-4 py-2 cursor-pointer transition',
                            highlightedIndex === index
                              ? 'bg-accent text-accent-foreground'
                              : 'hover:bg-accent/50',
                          )}
                        >
                          <div className="font-medium text-sm">
                            {String(item[displayField])}
                          </div>
                          {secondaryField && (
                            <div className="text-xs text-muted-foreground">
                              {String(item[secondaryField])}
                            </div>
                          )}
                        </li>
                      ))}
                  </ul>

                  {isError && (
                    <p className="mt-1 text-sm text-destructive">
                      Failed to load options
                    </p>
                  )}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )
        }}
      />
    </div>
  )
}
