import { toast } from 'sonner'
import { useApiMutation } from '@/hooks/use-api'
import { type IAuthRespose, type TLoginSchema } from './auth-type'
import { useAuthStore } from './use-auth-store'
import { useRouter } from '@tanstack/react-router'

export const useLoginMutation = () => {
  const { resetAuth } = useAuthStore()
  const router = useRouter()

  return useApiMutation<IAuthRespose, TLoginSchema>('/login', 'POST', {
    onSuccess: (data) => {
      const { accessToken } = data.data

      resetAuth({
        accessToken,
        isAuthenticated: true,
        isRefreshError: false,
        isRefreshing: false,
        isPreviousLoggedIn: true,
      })

      toast.success(data.message)
      router.navigate({ to: '/dashboard', replace: true })
    },
  })
}

export const useRegisterMutation = () => {
  const { setUser } = useAuthStore()
  const router = useRouter()

  return useApiMutation<Omit<IAuthRespose, 'accessToken'>, TLoginSchema>(
    '/register',
    'POST',
    {
      onSuccess: (data) => {
        const { user } = data.data
        setUser(user)
        toast.success(data.message)
        router.navigate({ to: '/auth/login', replace: true })
      },
    },
  )
}
