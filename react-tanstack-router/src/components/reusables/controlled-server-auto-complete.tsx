import { useState, useMemo } from 'react'
import { type Control, type FieldValues, type Path } from 'react-hook-form'
import { useCombobox } from 'downshift'
import { Search, X, Loader2 } from 'lucide-react'
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
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { Button } from '../ui/button'

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

export const ControlledServerAutocomplete = <
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
                  <InputGroup className="form-input!">
                    <InputGroupInput
                      {...getInputProps({
                        disabled,
                      })}
                      placeholder={placeholder}
                    />

                    {isLoading && (
                      <InputGroupAddon align="inline-end">
                        <Loader2 className="text-primary h-4 w-4 animate-spin" />
                      </InputGroupAddon>
                    )}
                    {value && (
                      <InputGroupAddon
                        align="inline-end"
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          selectItem(null)
                          setInputValue('')
                          onChange(null)
                        }}
                      >
                        <Button variant="ghost" size="icon-sm" className="p-0!">
                          <X />
                        </Button>
                      </InputGroupAddon>
                    )}

                    <InputGroupAddon
                      align="inline-end"
                      {...getToggleButtonProps()}
                    >
                      <Search />
                    </InputGroupAddon>
                  </InputGroup>
                  <ul
                    {...getMenuProps()}
                    className={cn(
                      'form-content',
                      'border-border scrollbar-thin absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border shadow-lg',
                      !(isOpen && items.length) && 'hidden',
                    )}
                  >
                    {isOpen && !isLoading && items.length === 0 && (
                      <li className="text-muted-foreground px-4 py-3 text-center text-sm">
                        No results found
                      </li>
                    )}

                    {isOpen &&
                      items.map((item, index) => (
                        <li
                          key={item.id}
                          {...getItemProps({ item, index })}
                          className={cn(
                            'cursor-pointer px-4 py-2 transition',
                            highlightedIndex === index
                              ? 'bg-accent text-accent-foreground'
                              : 'hover:bg-accent/50',
                          )}
                        >
                          <div className="text-sm font-medium">
                            {String(item[displayField])}
                          </div>
                          {secondaryField && (
                            <div className="text-muted-foreground text-xs">
                              {String(item[secondaryField])}
                            </div>
                          )}
                        </li>
                      ))}

                    {isError && (
                      <p className="text-error-main text-14 mt-1">
                        Failed to load options
                      </p>
                    )}
                  </ul>
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
