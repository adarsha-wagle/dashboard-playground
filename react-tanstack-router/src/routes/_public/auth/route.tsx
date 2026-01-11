// src/routes/dashboard/route.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/auth')({
  component: () => (
    <main className="container flex items-center justify-center min-h-screen">
      <Outlet />
    </main>
  ),
})
