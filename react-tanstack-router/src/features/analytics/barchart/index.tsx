import { CustomBarChart } from '@/components/charts/custom-bar-graph'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

const barChartData = [
  { month: 'Jan', sales: 320 },
  { month: 'Feb', sales: 410 },
  { month: 'Mar', sales: 280 },
  { month: 'Apr', sales: 500 },
  { month: 'May', sales: 460 },
]

const userGrowthData = [
  { week: 'Week 1', users: 120 },
  { week: 'Week 2', users: 180 },
  { week: 'Week 3', users: 240 },
  { week: 'Week 4', users: 310 },
]

function BarChartPage() {
  return (
    <>
      <PrimaryHeader title="Bar Chart" />
      <CustomBarChart chartData={barChartData} xKey="month" dataKey="sales" />
      <CustomBarChart chartData={userGrowthData} xKey="week" dataKey="users" />
    </>
  )
}

export default BarChartPage
