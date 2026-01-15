import TextEditorPage from '@/features/components/text-editor'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/components/text-editor/')({
  component: TextEditorPage,
})
