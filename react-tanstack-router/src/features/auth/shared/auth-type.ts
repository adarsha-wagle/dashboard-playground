import { z } from 'zod'

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long')
    .trim(),
  password: z
    .string()
    .min(3, 'Password must be at least 3 characters long')
    .max(50, 'Password must be at most 50 characters long')
    .trim(),
})

export type TRegisterSchema = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
  username: RegisterSchema.shape.username,
  password: RegisterSchema.shape.password,
})

export type TLoginSchema = z.infer<typeof LoginSchema>
export interface IUser {
  id: string
  username: string
}
export interface ILoginResponse {
  message: string
  accessToken: string
  refreshToken: string
}

export interface IRegisterResponse {
  message: string
  user: IUser
}

export interface IRefreshResponse {
  accessToken: string
}
