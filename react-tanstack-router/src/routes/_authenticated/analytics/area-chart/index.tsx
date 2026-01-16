import AreaChartPage from '@/features/analytics/areachart'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/analytics/area-chart/')({
  component: AreaChartPage,
})
