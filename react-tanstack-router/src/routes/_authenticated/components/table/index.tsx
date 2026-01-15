import TablePage from '@/features/components/table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/components/table/')({
  component: TablePage,
})
