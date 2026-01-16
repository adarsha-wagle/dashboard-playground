import LineChartPage from '@/features/analytics/linechart'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/analytics/line-chart/')({
  component: LineChartPage,
})
