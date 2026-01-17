import { CustomRadarChart } from '@/components/charts/custom-radar-chart'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

// Single series
export const radarSkillsSingle = [
  { skill: 'Communication', score: 85 },
  { skill: 'Problem Solving', score: 90 },
  { skill: 'Leadership', score: 75 },
  { skill: 'Teamwork', score: 95 },
  { skill: 'Creativity', score: 80 },
  { skill: 'Technical', score: 88 },
]

// Multiple series
export const radarSkillsComparison = [
  { skill: 'Communication', employee: 85, manager: 78, team: 82 },
  { skill: 'Problem Solving', employee: 90, manager: 88, team: 85 },
  { skill: 'Leadership', employee: 75, manager: 92, team: 80 },
  { skill: 'Teamwork', employee: 95, manager: 85, team: 90 },
  { skill: 'Creativity', employee: 80, manager: 75, team: 78 },
  { skill: 'Technical', employee: 88, manager: 82, team: 86 },
]

export const radarProductMetrics = [
  { metric: 'Performance', productA: 90, productB: 75, productC: 85 },
  { metric: 'Reliability', productA: 85, productB: 92, productC: 88 },
  { metric: 'Design', productA: 80, productB: 85, productC: 95 },
  { metric: 'Price', productA: 70, productB: 88, productC: 78 },
  { metric: 'Features', productA: 95, productB: 80, productC: 85 },
  { metric: 'Support', productA: 88, productB: 90, productC: 82 },
]

export const radarHealthMetrics = [
  { category: 'Cardio', current: 75, target: 90, average: 70 },
  { category: 'Strength', current: 85, target: 95, average: 80 },
  { category: 'Flexibility', current: 65, target: 85, average: 68 },
  { category: 'Endurance', current: 80, target: 90, average: 75 },
  { category: 'Balance', current: 70, target: 80, average: 72 },
  { category: 'Speed', current: 78, target: 88, average: 76 },
]

function RadarChartPage() {
  return (
    <>
      <PrimaryHeader title="Radar Chart" />
      <CustomRadarChart
        chartData={radarSkillsSingle}
        angleKey="skill"
        dataKey="score"
        title="Skills Assessment"
      />
      <CustomRadarChart
        chartData={radarSkillsComparison}
        angleKey="skill"
        dataKey={['employee', 'manager', 'team']}
        title="Skills Comparison"
      />
      <CustomRadarChart
        chartData={radarProductMetrics}
        angleKey="metric"
        dataKey={['productA', 'productB', 'productC']}
        title="Product Metrics Comparison"
      />
      <CustomRadarChart
        chartData={radarHealthMetrics}
        angleKey="category"
        dataKey={['current', 'target', 'average']}
        title="Health & Fitness Metrics"
        radarConfig={{
          fillOpacity: 0.2,
          strokeWidth: 3,
          dot: true,
        }}
      />{' '}
    </>
  )
}

export default RadarChartPage
