import PieChartPage from '@/features/analytics/piechart'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/analytics/pie-chart/')({
  component: PieChartPage,
})
