import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '@/lib/axios-instance'
import { type IApiErrorResponse, type IApiSuccessResponse } from '@/types/api'
import { type IAuthRespose, type IUser } from './auth-type'
import type { AxiosError } from 'axios'

type TAccessToken = string | null

type TAuthActions = {
  setUser: (user: IUser | null) => void
  setIsAuthLoading: (isRefreshing: boolean) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setAccessToken: (token: TAccessToken | null) => void
  resetAuth: (param?: Partial<TAuthState>) => void
  hydrateAuth: () => Promise<boolean>
  setIsPreviousLoggedIn: (status: boolean) => void
}

type TAuthState = {
  isRefreshing: boolean
  user: IUser | null
  isAuthenticated: boolean
  accessToken: TAccessToken | null
  isAuthError: boolean
  isPreviousLoggedIn: boolean
}

type TAuthStore = TAuthState & TAuthActions

const initAuthState: TAuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  isRefreshing: false,
  isAuthError: false,
  isPreviousLoggedIn: false,
}

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set) => ({
      ...initAuthState,

      setUser: (user) => set({ user }),
      setIsAuthLoading: (isRefreshing) => set({ isRefreshing }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setAccessToken: (token) => set({ accessToken: token }),
      setIsPreviousLoggedIn: (status) => set({ isPreviousLoggedIn: status }),

      resetAuth: (param?: Partial<TAuthState>) =>
        set({ ...initAuthState, ...(param || {}) }),

      hydrateAuth: async () => {
        try {
          const result = await api.post<
            IApiSuccessResponse<Omit<IAuthRespose, 'user'>>
          >('/refresh', {})

          const { accessToken } = result.data.data

          set({
            accessToken,
            isAuthenticated: true,
            isRefreshing: false,
            isAuthError: false,
            isPreviousLoggedIn: true,
          })

          return true
        } catch (err) {
          console.log('Error', err)

          set({
            ...initAuthState,
            isRefreshing: false,
            isAuthError: true,
          })
          return false
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isPreviousLoggedIn: state.isPreviousLoggedIn,
      }),
    },
  ),
)

export const getAccessToken = () => useAuthStore.getState().accessToken
export const resetAuth = (param?: Partial<TAuthState>) =>
  useAuthStore.getState().resetAuth(param)
export const hydrateAuth = () => useAuthStore.getState().hydrateAuth()
