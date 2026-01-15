import { RegisterForm } from '@/features/auth/register/components/register-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/dashboard-auth/register/',
)({
  component: RegisterForm,
})
