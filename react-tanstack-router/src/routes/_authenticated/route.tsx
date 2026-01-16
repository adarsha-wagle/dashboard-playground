import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/features/auth/shared/use-auth-store'
import { SidebarProvider } from '@/components/layouts/authenticated/sidebar/sidebar-context'
import { AnimatedSidebar } from '@/components/layouts/authenticated/sidebar/app-sidebar'
import { DashboardHeader } from '@/components/layouts/authenticated/header/dashboard-header'
import { BoxLoader } from '@/components/data-table/table-loader'
import { SidebarFooter } from '@/components/layouts/authenticated/sidebar/sidebar-footer'
import { navigationData } from '@/config/sidebar'

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
  // Show loader while checking for access token (You can show skeleton ui of your dashboard)
  pendingComponent: () => <BoxLoader />,
  onError: (error) => console.error(error),
})

function RouteComponent() {
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
        <div className="flex h-screen overflow-hidden w-full">
          <AnimatedSidebar
            navigation={navigationData}
            footer={<SidebarFooter />}
          />
          <div className="flex flex-1 flex-col">
            <DashboardHeader title="Dashboard" subtitle="Welcome back, John" />
            <main className="p-8 overflow-y-scroll scrollbar-thin space-y-8">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  )
}
