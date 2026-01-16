import BarChartPage from '@/features/analytics/barchart'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/analytics/bar-chart/')({
  component: BarChartPage,
})
