import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}

// for use with hooks
export const getDebouncer = (func: (...args: any[]) => void, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>

  const debounce = (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }

  const cancelDebounce = () => {
    clearTimeout(timeout)
  }

  return { debounce, cancelDebounce }
}

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const ret = {} as Pick<T, K> // strongly type the result object

  keys.forEach((key) => {
    const value = obj[key]
    if (value !== undefined && value !== null) {
      ret[key] = value // only add key if value is not undefined, null, or empty string
    }
  })

  return ret
}

export const cleanObj = (obj: Record<string, any>) => {
  const _obj = { ...obj }
  Object.keys(_obj).forEach(
    (key) =>
      (_obj[key] === undefined || _obj[key] === null || _obj[key] === '') &&
      delete _obj[key],
  )
  return _obj
}
