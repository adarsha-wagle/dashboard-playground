import { Label, Pie, PieChart, ResponsiveContainer } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { TLabelKey, TNumericKey } from './chart-type'
import { defaultChartColors } from './chart-utils'
import { useMemo, type HTMLProps } from 'react'
import { cn } from '@/lib/utils'

type PieDatumBase = Record<string, unknown>

export interface IPieChartConfig {
  innerRadius?: number
  outerRadius?: number
  startAngle?: number
  endAngle?: number
  stroke?: string
  legendPosition?: 'right' | 'bottom'
  className?: HTMLProps<HTMLDivElement>['className']
}

// Combined props
type TCustomPieChartProps<T extends PieDatumBase> = {
  chartConfig?: ChartConfig
  pieConfig?: IPieChartConfig
  chartData: T[]
  dataKey: TNumericKey<T>
  nameKey: TLabelKey<T>
  colors?: readonly string[]
  title?: string
  className?: HTMLProps<HTMLDivElement>['className']
  totalLabel?: string
}

function CustomPieChart<T extends PieDatumBase>({
  chartConfig = {},
  pieConfig = {},
  chartData,
  dataKey,
  nameKey,
  colors = defaultChartColors,
  className = '',
  title = '',
  totalLabel = '',
}: TCustomPieChartProps<T>) {
  // Default pie values
  const {
    innerRadius = 50,
    outerRadius = 80,
    startAngle = 0,
    endAngle = 360,
    stroke = 'none',
    legendPosition = 'bottom',
    className: pieClassName = '',
  } = pieConfig

  const totalValue = useMemo(
    () =>
      chartData.reduce((sum, item) => {
        const value = item[dataKey as string]
        return sum + (typeof value === 'number' ? value : 0)
      }, 0),
    [chartData, dataKey],
  )

  console.log('Custom Pie Chart Re-Rendered')

  // Add color to each data point
  const enrichedData = chartData.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
  }))

  return (
    <div
      className={cn(
        'flex flex-col gap-2 border p-6 rounded-lg',
        legendPosition === 'right' && 'flex-row',
        className,
      )}
    >
      <div>
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <ChartContainer
          config={chartConfig}
          className={cn('mx-auto aspect-square w-sm', pieClassName)}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip cursor content={<ChartTooltipContent />} />
              <Pie
                data={enrichedData}
                dataKey={dataKey as string}
                nameKey={nameKey as string}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                stroke={stroke}
              >
                {totalLabel && (
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-gray-900  text-2xl font-medium"
                            >
                              {totalValue?.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-gray-600 dark:fill-gray-400 text-sm"
                            >
                              {totalLabel}
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                )}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div
        className={cn(
          'flex flex-col gap-2',
          legendPosition === 'bottom'
            ? 'flex-row mx-auto w-fit flex-wrap'
            : 'flex-col',
        )}
      >
        {chartData.map((entry, index) => (
          <div key={`v-legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm "
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <p className="text-sm text-black ">
              {entry[nameKey as string] as string}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomPieChart
