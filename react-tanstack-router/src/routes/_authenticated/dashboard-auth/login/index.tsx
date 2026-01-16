import PrimaryHeader from '@/components/layouts/authenticated/primary-header'
import { LoginForm } from '@/features/auth/login/components/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard-auth/login/')({
  component: DashboardLogin,
})

function DashboardLogin() {
  return (
    <>
      <PrimaryHeader title="Login Form" description="Simple Login Form" />
      <LoginForm />
    </>
  )
}
