import { CustomComposedChart } from '@/components/charts/custom-composed-chart'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

const salesProfitData = [
  { month: 'Jan', sales: 4000, profit: 2400 },
  { month: 'Feb', sales: 3000, profit: 1398 },
  { month: 'Mar', sales: 5000, profit: 2800 },
  { month: 'Apr', sales: 4780, profit: 3908 },
  { month: 'May', sales: 5890, profit: 4800 },
]

const revenueUsersData = [
  { quarter: 'Q1', revenue: 1200, users: 120, profit: 500 },
  { quarter: 'Q2', revenue: 1850, users: 300, profit: 800 },
  { quarter: 'Q3', revenue: 1620, users: 200, profit: 620 },
  { quarter: 'Q4', revenue: 2100, users: 1000, profit: 900 },
]

function ComposedChartPage() {
  return (
    <>
      <PrimaryHeader title="Composed Chart" />
      <CustomComposedChart
        chartData={revenueUsersData}
        xKey="quarter"
        barKey="revenue"
        areaKey="users"
        lineKey="profit"
      />
      <CustomComposedChart
        chartData={salesProfitData}
        xKey="month"
        barKey="sales"
        lineKey="profit"
      />
    </>
  )
}

export default ComposedChartPage
