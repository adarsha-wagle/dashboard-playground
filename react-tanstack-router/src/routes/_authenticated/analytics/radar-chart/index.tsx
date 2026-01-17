import RadarChartPage from '@/features/analytics/radarchart'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/analytics/radar-chart/')({
  component: RadarChartPage,
})
