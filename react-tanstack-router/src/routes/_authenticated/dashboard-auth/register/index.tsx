import PrimaryHeader from '@/components/layouts/authenticated/primary-header'
import { RegisterForm } from '@/features/auth/register/components/register-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/dashboard-auth/register/',
)({
  component: DashboardRegister,
})

function DashboardRegister() {
  return (
    <>
      <PrimaryHeader title="Register Form" description="Simple Register Form" />
      <RegisterForm />
    </>
  )
}
