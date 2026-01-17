import CustomPieChart from '@/components/charts/custom-pie-chart'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

const browserPieData = [
  { name: 'Chrome', value: 68 },
  { name: 'Safari', value: 22 },
  { name: 'Firefox', value: 10 },
]

const productRevenuePieData = [
  { category: 'Electronics', revenue: 45000 },
  { category: 'Clothing', revenue: 30000 },
  { category: 'Books', revenue: 15000 },
  { category: 'Home & Garden', revenue: 10000 },
]

function PieChartPage() {
  return (
    <>
      <PrimaryHeader
        title="Pie Chart"
        description="Recharts Piechart abstracted just copy and paste "
      />
      <section className="flex justify-between">
        <CustomPieChart
          chartData={browserPieData}
          dataKey="value"
          nameKey="name"
          pieConfig={{
            innerRadius: 100,
            outerRadius: 160,
            legendPosition: 'right',
          }}
          title="Browser Data"
          totalLabel="Total Data"
        />
        <CustomPieChart
          chartData={productRevenuePieData}
          dataKey="revenue"
          nameKey="category"
          pieConfig={{
            innerRadius: 100,
            outerRadius: 160,
            legendPosition: 'right',
          }}
          title="Product Revenue"
          totalLabel="Total Revenue"
        />
      </section>
    </>
  )
}

export default PieChartPage
