interface IUser {
  username: string
  avatar: string
  id: string
}

type TAccessToken = string | null

import { create } from 'zustand'

type TAuthState = {
  isAuthLoading: boolean
  setIsAuthLoading: (isAuthLoading: boolean) => void
  user: IUser | null
  setUser: (user: IUser | null) => void
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setAccessToken: (token: TAccessToken | null) => void
  accessToken: TAccessToken | null
}

export const useAuthStore = create<TAuthState>((set) => ({
  user: null,
  setUser: (user: IUser | null) => set({ user }),
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setAccessToken: (token: TAccessToken | null) => set({ accessToken: token }),
  accessToken: null,
  isAuthLoading: true,
  setIsAuthLoading: (isAuthLoading: boolean) => set({ isAuthLoading }),
}))
