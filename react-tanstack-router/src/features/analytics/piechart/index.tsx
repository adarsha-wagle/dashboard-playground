import { CustomPieChart } from '@/components/charts/custom-pie-chart'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'
import React from 'react'

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
      <PrimaryHeader title="Pie Chart" />
      <section className="flex justify-center">
        <div className="w-xs">
          <CustomPieChart
            chartData={browserPieData}
            dataKey="value"
            nameKey="name"
          />
        </div>
        <div className="w-xs">
          <CustomPieChart
            chartData={productRevenuePieData}
            dataKey="revenue"
            nameKey="category"
          />
        </div>
      </section>
    </>
  )
}

export default PieChartPage
