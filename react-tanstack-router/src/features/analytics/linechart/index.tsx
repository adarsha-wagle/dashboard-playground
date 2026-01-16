import { CustomLineChart } from '@/components/charts/custom-line-chart'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

const lineChartData = [
  { day: 'Mon', visitors: 120 },
  { day: 'Tue', visitors: 200 },
  { day: 'Wed', visitors: 150 },
  { day: 'Thu', visitors: 300 },
  { day: 'Fri', visitors: 250 },
  { day: 'Sat', visitors: 400 },
  { day: 'Sun', visitors: 350 },
]

const multiLineChartData = [
  { day: 'Mon', visitors: 120, revenue: 300 },
  { day: 'Tue', visitors: 200, revenue: 450 },
  { day: 'Wed', visitors: 150, revenue: 350 },
  { day: 'Thu', visitors: 300, revenue: 600 },
  { day: 'Fri', visitors: 250, revenue: 500 },
  { day: 'Sat', visitors: 400, revenue: 750 },
  { day: 'Sun', visitors: 350, revenue: 700 },
]

function LineChartPage() {
  return (
    <>
      <PrimaryHeader title="Line Chart" />
      <CustomLineChart
        chartData={lineChartData}
        xKey="day"
        dataKey="visitors"
      />
      <CustomLineChart
        chartData={multiLineChartData}
        xKey="day"
        dataKey="visitors"
      />
    </>
  )
}

export default LineChartPage
