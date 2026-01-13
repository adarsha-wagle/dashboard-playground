import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/features/auth/shared/use-auth-store'
import { SidebarProvider } from '@/components/layouts/authenticated/sidebar/sidebar-context'
import { AnimatedSidebar } from '@/components/layouts/authenticated/sidebar/app-sidebar'
import { navigationData } from '@/components/layouts/authenticated/sidebar/data'
import { DashboardHeader } from '@/components/layouts/authenticated/header/dashboard-header'
import { BoxLoader } from '@/components/data-table/table-loader'
import { SidebarFooter } from '@/components/layouts/authenticated/sidebar/sidebar-footer'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
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
  pendingComponent: () => <BoxLoader />,
})

function RouteComponent() {
  const { isRefreshing, isAuthError } = useAuthStore()

  if (isRefreshing) return <div>Loading...</div>

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
      <SidebarProvider defaultExpanded={true}>
        <div className="flex min-h-screen w-full">
          <AnimatedSidebar
            navigation={navigationData}
            footer={<SidebarFooter />}
          />
          <div className="flex flex-1 flex-col">
            <DashboardHeader title="Dashboard" subtitle="Welcome back, John" />
            <div className="p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  )
}
