import { defaultChartColors } from '@/components/charts/chart-utils'
import { CustomAreaChart } from '@/components/charts/custom-area-chart'
import Main from '@/components/layouts/authenticated/main'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

export const areaDailyVisitors = [
  { day: 'Mon', visitors: 120 },
  { day: 'Tue', visitors: 200 },
  { day: 'Wed', visitors: 150 },
  { day: 'Thu', visitors: 300 },
  { day: 'Fri', visitors: 250 },
  { day: 'Sat', visitors: 400 },
  { day: 'Sun', visitors: 350 },
]

export const areaTrafficData = [
  { day: 'Mon', desktop: 1200, mobile: 2400, tablet: 800 },
  { day: 'Tue', desktop: 1500, mobile: 2800, tablet: 900 },
  { day: 'Wed', desktop: 1300, mobile: 2600, tablet: 850 },
  { day: 'Thu', desktop: 1800, mobile: 3200, tablet: 1100 },
  { day: 'Fri', desktop: 2000, mobile: 3500, tablet: 1200 },
  { day: 'Sat', desktop: 2200, mobile: 4000, tablet: 1400 },
  { day: 'Sun', desktop: 1900, mobile: 3800, tablet: 1300 },
]

function AreaChartPage() {
  return (
    <Main>
      <PrimaryHeader title="Area Chart" />
      <CustomAreaChart
        chartData={areaDailyVisitors}
        xKey="day"
        dataKey="visitors"
        title="Daily Visitors"
      />
      <CustomAreaChart
        chartData={areaTrafficData}
        xKey="day"
        dataKey={['desktop', 'mobile', 'tablet']}
        title="Multiple Area Chart Traffic Data"
        areaConfig={{ color: defaultChartColors[2] }}
      />
    </Main>
  )
}

export default AreaChartPage
