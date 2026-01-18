import { CustomComposedChart } from '@/components/charts/custom-composed-chart'
import Main from '@/components/layouts/authenticated/main'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

const salesProfitData = [
  { month: 'Jan', sales: 4000, profit: 2400 },
  { month: 'Feb', sales: 3000, profit: 1398 },
  { month: 'Mar', sales: 5000, profit: 2800 },
  { month: 'Apr', sales: 4780, profit: 3908 },
  { month: 'May', sales: 5890, profit: 4800 },
]

const composedBusinessMetrics = [
  { month: 'Jan', revenue: 12000, expenses: 8000, users: 450, growth: 320 },
  { month: 'Feb', revenue: 15000, expenses: 9500, users: 520, growth: 380 },
  { month: 'Mar', revenue: 13000, expenses: 8800, users: 4800, growth: 340 },
  { month: 'Apr', revenue: 18000, expenses: 11000, users: 6300, growth: 450 },
  { month: 'May', revenue: 16000, expenses: 10200, users: 5800, growth: 410 },
  { month: 'Jun', revenue: 20000, expenses: 12500, users: 7200, growth: 520 },
]

function ComposedChartPage() {
  return (
    <Main>
      <PrimaryHeader title="Composed Chart" />
      <CustomComposedChart
        chartData={salesProfitData}
        xKey="month"
        barKey="sales"
        lineKey="profit"
        title="Sales and Profit"
      />
      <CustomComposedChart
        chartData={composedBusinessMetrics}
        xKey="month"
        barKey={['revenue', 'expenses']}
        areaKey={['expenses']}
        lineKey={['users', 'growth']}
        title="Multiple Metrics Comparison"
      />
    </Main>
  )
}

export default ComposedChartPage
