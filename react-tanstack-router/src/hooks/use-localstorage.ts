'use client'

type TKey = 'userInfo'

export const useLocalStorage = (key: TKey) => {
  const setItem = (value: unknown) => {
    try {
      if (typeof window === 'undefined') return
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  const getItem = () => {
    try {
      if (typeof window === 'undefined') return undefined
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : undefined
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  const removeItem = () => {
    try {
      if (typeof window === 'undefined') return
      localStorage.removeItem(key)
    } catch (error) {
      console.log(error)
    }
  }

  return { setItem, getItem, removeItem }
}
