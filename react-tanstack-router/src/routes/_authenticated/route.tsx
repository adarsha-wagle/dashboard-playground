import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/features/auth/shared/use-auth-store'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async () => {
    const authStore = useAuthStore.getState()

    // If access token already exits, allow immediately
    if (authStore.isAuthenticated) return

    if (authStore.isAuthError || !authStore.isPreviousLoggedIn) {
      redirect({
        to: '/auth/login',
        throw: true,
      })
    }
  },
})

function RouteComponent() {
  const { isAuthLoading, isAuthError } = useAuthStore()

  if (isAuthLoading) return <div>Loading...</div>

  if (isAuthError) {
    return (
      <div>
        Oops it looks like your token just expired. Please
        <Link to="/auth/login">Login</Link> again
      </div>
    )
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
