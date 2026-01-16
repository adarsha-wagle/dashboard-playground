import ScatterChartPage from '@/features/analytics/scatterchart'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/analytics/scatter-chart/',
)({
  component: ScatterChartPage,
})
