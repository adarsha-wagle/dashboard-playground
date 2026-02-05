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

export function getTimeAgo(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const units: { name: string; seconds: number }[] = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 },
    { name: 'second', seconds: 1 },
  ]

  const unit = units.find((ut) => {
    const elapsed = Math.floor(diffInSeconds / ut.seconds)
    return elapsed > 0
  })

  if (unit) {
    const elapsed = Math.floor(diffInSeconds / unit.seconds)
    return elapsed === 1 ? `1 ${unit.name} ago` : `${elapsed} ${unit.name}s ago`
  }

  return 'just now'
}

export const getLocalTime = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  return new Date(date).toLocaleTimeString('en-US', options)
}
