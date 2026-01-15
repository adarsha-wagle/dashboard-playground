import InputFieldsPage from '@/features/components/input-fields'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/components/input-fields/')({
  component: InputFieldsPage,
})
