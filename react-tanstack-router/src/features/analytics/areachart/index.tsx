import { CustomAreaChart } from '@/components/charts/custom-area-chart'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

export const areaDailyVisitors = [
  { day: 'Mon', visitors: 120 },
  { day: 'Tue', visitors: 200 },
  { day: 'Wed', visitors: 150 },
  { day: 'Thu', visitors: 300 },
  { day: 'Fri', visitors: 250 },
  { day: 'Sat', visitors: 400 },
  { day: 'Sun', visitors: 350 },
]

export const areaWeeklyRevenue = [
  { week: 'Week 1', revenue: 12000 },
  { week: 'Week 2', revenue: 15000 },
  { week: 'Week 3', revenue: 13000 },
  { week: 'Week 4', revenue: 18000 },
]

const chartConfigVisitors = {
  visitors: {
    label: 'Daily Visitors',
    color: '#ff0000',
  },
}

const chartConfigRevenue = {
  revenue: {
    label: 'Weekly Revenue',
    color: '#00ff00',
  },
}
function AreaChartPage() {
  return (
    <>
      <PrimaryHeader title="Area Chart" />
      <section>
        <CustomAreaChart
          chartData={areaDailyVisitors}
          xKey="day"
          dataKey="visitors"
          chartConfig={chartConfigVisitors}
        />
        <CustomAreaChart
          chartData={areaWeeklyRevenue}
          xKey="week"
          dataKey="revenue"
          chartConfig={chartConfigRevenue}
        />
      </section>
    </>
  )
}

export default AreaChartPage
