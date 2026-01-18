import { CustomScatterChart } from '@/components/charts/custom-scatter-chart'
import Main from '@/components/layouts/authenticated/main'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

const scatterHeightWeight = [
  { height: 170, weight: 65 },
  { height: 165, weight: 58 },
  { height: 180, weight: 75 },
  { height: 175, weight: 70 },
  { height: 160, weight: 55 },
  { height: 185, weight: 80 },
]

const scatterProductA = [
  { price: 10, sales: 120 },
  { price: 15, sales: 95 },
  { price: 20, sales: 75 },
  { price: 25, sales: 60 },
  { price: 30, sales: 45 },
]

const scatterProductB = [
  { price: 12, sales: 150 },
  { price: 18, sales: 125 },
  { price: 22, sales: 100 },
  { price: 28, sales: 80 },
  { price: 35, sales: 65 },
]

const scatterProductC = [
  { price: 8, sales: 180 },
  { price: 14, sales: 140 },
  { price: 19, sales: 110 },
  { price: 24, sales: 90 },
  { price: 32, sales: 70 },
]

function ScatterChartPage() {
  return (
    <Main>
      <PrimaryHeader title="Scatter Chart" />
      <CustomScatterChart
        chartData={scatterHeightWeight}
        xKey="height"
        yKey="weight"
        title="Height & Weight"
      />
      <CustomScatterChart
        series={[
          {
            data: scatterProductA,
            xKey: 'price',
            yKey: 'sales',
            name: 'Product A',
          },
          {
            data: scatterProductB,
            xKey: 'price',
            yKey: 'sales',
            name: 'Product B',
          },
          {
            data: scatterProductC,
            xKey: 'price',
            yKey: 'sales',
            name: 'Product C',
          },
        ]}
        title="Price vs Sales by Product"
      />
    </Main>
  )
}

export default ScatterChartPage
