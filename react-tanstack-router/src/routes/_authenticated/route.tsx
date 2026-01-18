import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/features/auth/shared/use-auth-store'
import { SidebarProvider } from '@/components/layouts/authenticated/sidebar/sidebar-context'
import { AnimatedSidebar } from '@/components/layouts/authenticated/sidebar/app-sidebar'
import { DashboardHeader } from '@/components/layouts/authenticated/header/dashboard-header'
import { BoxLoader } from '@/components/data-table/table-loader'
import { navigationData } from '@/config/sidebar'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedRouteLayout,
  beforeLoad: async () => {
    const authStore = useAuthStore.getState()

    if (authStore.isAuthError || !authStore.isPreviousLoggedIn) {
      redirect({
        to: '/auth/login',
        throw: true,
      })
    }

    // If access token already exits, allow immediately
    if (!authStore.accessToken) {
      const isSuccess = await authStore.hydrateAuth()
      if (!isSuccess) {
        redirect({
          to: '/auth/login',
          throw: true,
        })
      }
    }
    return
  },
  // Show loader while checking for access token (You can show skeleton ui of your dashboard)
  pendingComponent: () => <BoxLoader />,
  onError: (error) => console.error(error),
})

function AuthenticatedRouteLayout() {
  const { isAuthError } = useAuthStore()

  // If there is refresh Error (refresh token deleted/expired) then show this error or you can create a custom error page
  if (isAuthError) {
    return (
      <div>
        Oops it looks like your token just expired. Please
        <Link to="/auth/login">Login</Link> again
      </div>
    )
  }

  return (
    <>
      <SidebarProvider defaultExpanded>
        <div className="flex h-screen w-full overflow-hidden">
          <AnimatedSidebar navigation={navigationData} />
          <div className="flex flex-1 flex-col">
            <DashboardHeader />
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </>
  )
}
