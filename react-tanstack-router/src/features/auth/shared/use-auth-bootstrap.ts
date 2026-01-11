import { useEffect, useRef } from 'react'
import { useAuthStore } from './use-auth-store'

export function useAuthBootstrap() {
  const isEffectRan = useRef<boolean>(false)

  const { hydrateAuth, isAuthenticated } = useAuthStore()

  // Runs only one-time in bg
  useEffect(() => {
    // Return if the user is authenticated or the effect has ran.
    if (isEffectRan.current || isAuthenticated) return

    hydrateAuth()
    isEffectRan.current = true
  }, [])
}
