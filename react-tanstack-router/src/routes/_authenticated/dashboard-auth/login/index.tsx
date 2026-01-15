import { LoginForm } from '@/features/auth/login/components/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard-auth/login/')({
  component: LoginForm,
})
