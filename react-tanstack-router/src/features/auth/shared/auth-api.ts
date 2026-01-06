import { toast } from 'sonner'
import { useApiMutation } from '@/hooks/use-api'
import {
  type ILoginResponse,
  type TLoginSchema,
  type IRegisterResponse,
  type IRefreshResponse,
} from './auth-type'
import { useAuthStore } from './use-auth-store'
import { useRouter } from '@tanstack/react-router'

export const useLoginMutation = () => {
  const { setAccessToken, setIsAuthenticated } = useAuthStore()
  const router = useRouter()

  return useApiMutation<ILoginResponse, TLoginSchema>('login', 'POST', {
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      setIsAuthenticated(true)
      toast.success(data.message)
      //   router.navigate('/')
    },
  })
}
export const useRefreshMutation = () => {
  const { setAccessToken, setIsAuthenticated, setIsAuthLoading } =
    useAuthStore()
  return useApiMutation<IRefreshResponse, { refreshToken: string }>(
    'refresh',
    'POST',
    {
      onMutate: () => {
        setIsAuthLoading(true)
      },
      onSuccess: (data) => {
        setAccessToken(data.accessToken)
        setIsAuthenticated(true)
      },
      onSettled: () => {
        setIsAuthLoading(false)
      },
    },
  )
}
export const useRegisterMutation = () => {
  const { setUser } = useAuthStore()
  //   const router = useRouter()
  return useApiMutation<IRegisterResponse, TLoginSchema>('register', 'POST', {
    onSuccess: (data) => {
      toast.success(data.message)
      //   setUser(data.user)
      //   router.push('/auth/login')
    },
  })
}
