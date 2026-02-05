import { CustomBarChart } from '@/components/charts/custom-bar-chart'
import Main from '@/components/layouts/authenticated/main'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

const barChartData = [
  { month: 'Jan', sales: 320 },
  { month: 'Feb', sales: 410 },
  { month: 'Mar', sales: 280 },
  { month: 'Apr', sales: 500 },
  { month: 'May', sales: 460 },
]

export const barMonthlyComparison = [
  { month: 'Jan', revenue: 12000, expenses: 8000, profit: 4000 },
  { month: 'Feb', revenue: 15000, expenses: 9500, profit: 5500 },
  { month: 'Mar', revenue: 13000, expenses: 8800, profit: 4200 },
  { month: 'Apr', revenue: 18000, expenses: 11000, profit: 7000 },
  { month: 'May', revenue: 16000, expenses: 10200, profit: 5800 },
  { month: 'Jun', revenue: 20000, expenses: 12500, profit: 7500 },
]

function BarChartPage() {
  return (
    <Main>
      <PrimaryHeader
        title="Bar Chart"
        description="Recharts Bar Chart abstracted - just copy and paste"
      />

      <CustomBarChart
        chartData={barChartData}
        xKey="month"
        dataKey="sales"
        title="Sales"
      />

      <CustomBarChart
        chartData={barMonthlyComparison}
        xKey="month"
        dataKey={['expenses', 'profit', 'revenue']}
        title="Multiple Bar Chart"
      />
    </Main>
  )
}

export default BarChartPage
