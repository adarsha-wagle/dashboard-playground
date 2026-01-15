import ServerAutocompletePage from '@/features/components/server-autocomplete'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/components/server-autocomplete/',
)({
  component: ServerAutocompletePage,
})
