import { CustomScatterChart } from '@/components/charts/custom-scatter-chart'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

const scatterHeightWeight = [
  { height: 170, weight: 65 },
  { height: 165, weight: 58 },
  { height: 180, weight: 75 },
  { height: 175, weight: 70 },
  { height: 160, weight: 55 },
  { height: 185, weight: 80 },
]

const scatterStudyScore = [
  { hours: 2, score: 70 },
  { hours: 4, score: 80 },
  { hours: 1, score: 60 },
  { hours: 5, score: 90 },
  { hours: 3, score: 75 },
  { hours: 6, score: 95 },
]

function ScatterChartPage() {
  return (
    <>
      <PrimaryHeader title="Scatter Chart" />
      <CustomScatterChart
        chartData={scatterHeightWeight}
        xKey="height"
        yKey="weight"
      />
      <CustomScatterChart
        chartData={scatterStudyScore}
        xKey="hours"
        yKey="score"
      />
    </>
  )
}

export default ScatterChartPage
