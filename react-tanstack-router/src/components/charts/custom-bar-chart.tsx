import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import type { IAxisStyle, TLabelKey, TNumericKey } from './chart-type'
import type { HTMLProps } from 'react'
import { cn } from '@/lib/utils'
import { defaultChartStyle } from './chart-utils'

type BarDatumBase = Record<string, unknown>

// Specific config for BarChart
export interface BarChartConfig {
  barSize?: number
  radius?: [number, number, number, number]

  // Axis styling
  xAxis?: IAxisStyle
  yAxis?: IAxisStyle
}

// Props
type TCustomBarChartProps<T extends BarDatumBase> = {
  chartConfig?: any
  barConfig?: BarChartConfig
  chartData: T[]
  xKey: TLabelKey<T>
  dataKey: TNumericKey<T> | TNumericKey<T>[] // Support single or multiple keys
  className?: HTMLProps<HTMLDivElement>['className']
  title?: string
}

export function CustomBarChart<T extends BarDatumBase>({
  chartConfig = {},
  barConfig = {},
  chartData,
  xKey,
  dataKey,
  className = '',
  title = '',
}: TCustomBarChartProps<T>) {
  const {
    barSize = 30,
    radius = [4, 4, 0, 0],
    xAxis = defaultChartStyle.xAxis,
    yAxis = defaultChartStyle.yAxis,
  } = barConfig

  // Convert dataKey to array for consistent handling
  const dataKeys = Array.isArray(dataKey) ? dataKey : [dataKey]
  const isSingleBar = dataKeys.length === 1

  // Add color to each data point (only for single bar charts)
  const enrichedData = isSingleBar
    ? chartData.map((item, index) => ({
        ...item,
        fill: defaultChartStyle?.colors[
          index % defaultChartStyle.colors.length
        ],
      }))
    : chartData

  return (
    <div className="rounded-lg border p-6">
      <div>
        {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}

        <ChartContainer
          config={chartConfig}
          className={cn('mx-auto h-75 w-full', className)}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={enrichedData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey={xKey as string}
                stroke={xAxis?.stroke}
                tick={{
                  fill: xAxis?.tickColor,
                  fontSize: xAxis?.fontSize,
                  fontWeight: xAxis?.fontWeight,
                }}
              />
              <YAxis
                stroke={yAxis?.stroke}
                tick={{
                  fill: yAxis?.tickColor,
                  fontSize: yAxis?.fontSize,
                  fontWeight: yAxis?.fontWeight,
                }}
              />

              <ChartTooltip cursor content={<ChartTooltipContent />} />

              {dataKeys.map((key, index) => (
                <Bar
                  key={key as string}
                  dataKey={key as string}
                  barSize={barSize}
                  radius={radius}
                  fill={
                    isSingleBar
                      ? undefined // Let Cell components handle colors
                      : defaultChartStyle?.colors[
                          index % defaultChartStyle.colors.length
                        ]
                  }
                >
                  {isSingleBar &&
                    enrichedData.map((entry, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={
                          typeof entry.fill === 'string'
                            ? entry.fill
                            : undefined
                        }
                      />
                    ))}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
