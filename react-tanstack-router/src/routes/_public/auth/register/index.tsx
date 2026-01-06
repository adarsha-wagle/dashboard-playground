import Register from '@/features/auth/register'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/auth/register/')({
  component: Register,
})
