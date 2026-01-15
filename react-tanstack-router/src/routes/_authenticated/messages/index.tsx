import MessagesPage from '@/features/messages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/messages/')({
  component: MessagesPage,
})
