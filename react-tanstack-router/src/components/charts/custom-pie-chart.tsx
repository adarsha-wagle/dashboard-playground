import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { TLabelKey, TNumericKey } from './chart-type'
import { defaultChartColors } from './chart-utils'
import type { HTMLProps } from 'react'
import { cn } from '@/lib/utils'

type PieDatumBase = Record<string, unknown>

// Specific config for PieChart
export interface PieChartConfig {
  innerRadius?: number
  outerRadius?: number
  startAngle?: number
  endAngle?: number
  stroke?: string
}

// Combined props
type TCustomPieChartProps<T extends PieDatumBase> = {
  chartConfig?: ChartConfig
  pieConfig?: PieChartConfig
  chartData: T[]
  dataKey: TNumericKey<T>
  nameKey: TLabelKey<T>
  colors?: readonly string[]
  className?: HTMLProps<HTMLDivElement>['className']
}

export function CustomPieChart<T extends PieDatumBase>({
  chartConfig = {},
  pieConfig = {},
  chartData,
  dataKey,
  nameKey,
  colors = defaultChartColors,
  className = '',
}: TCustomPieChartProps<T>) {
  // Default pie values
  const {
    innerRadius = 50,
    outerRadius = 80,
    startAngle = 0,
    endAngle = 360,
    stroke = 'none',
  } = pieConfig

  return (
    <ChartContainer
      config={chartConfig}
      className={cn('mx-auto aspect-square', className)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <ChartTooltip
            cursor
            content={
              <ChartTooltipContent className="bg-white dark:bg-primaryBlack text-themePink dark:text-primaryWhite" />
            }
          />
          <Pie
            data={chartData}
            dataKey={dataKey as string}
            nameKey={nameKey as string}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            stroke={stroke}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={entry[nameKey as string] as string}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
