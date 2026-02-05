import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import type { IAxisStyle, TLabelKey, TNumericKey } from './chart-type'
import type { HTMLProps } from 'react'
import { cn } from '@/lib/utils'
import { defaultChartStyle } from './chart-utils'

type ComposedDatumBase = Record<string, unknown>

// Specific config for ComposedChart
export interface ComposedChartConfig {
  barSize?: number
  barRadius?: [number, number, number, number]
  lineStrokeWidth?: number
  lineDot?: boolean
  areaFillOpacity?: number

  xAxis?: IAxisStyle
  yAxis?: IAxisStyle
  className?: HTMLProps<HTMLDivElement>['className']
}

// Props
type TCustomComposedChartProps<T extends ComposedDatumBase> = {
  chartConfig?: any
  composedConfig?: ComposedChartConfig
  chartData: T[]
  xKey: TLabelKey<T>
  barKey?: TNumericKey<T> | TNumericKey<T>[] // Support single or multiple keys
  lineKey?: TNumericKey<T> | TNumericKey<T>[] // Support single or multiple keys
  areaKey?: TNumericKey<T> | TNumericKey<T>[] // Support single or multiple keys
  className?: HTMLProps<HTMLDivElement>['className']
  title?: string
}

export function CustomComposedChart<T extends ComposedDatumBase>({
  chartConfig = {},
  composedConfig = {},
  chartData,
  xKey,
  barKey,
  lineKey,
  areaKey,
  className = '',
  title = '',
}: TCustomComposedChartProps<T>) {
  const {
    barSize = 30,
    barRadius = [4, 4, 0, 0],
    lineStrokeWidth = 2,
    lineDot = false,
    areaFillOpacity = 0.2,
    xAxis = defaultChartStyle.xAxis,
    yAxis = defaultChartStyle.yAxis,
    className: composedClassName = '',
  } = composedConfig

  // Convert keys to arrays for consistent handling
  const barKeys = barKey ? (Array.isArray(barKey) ? barKey : [barKey]) : []
  const lineKeys = lineKey ? (Array.isArray(lineKey) ? lineKey : [lineKey]) : []
  const areaKeys = areaKey ? (Array.isArray(areaKey) ? areaKey : [areaKey]) : []

  return (
    <div className={cn('rounded-lg border p-6', className)}>
      <div>
        {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}

        <ChartContainer
          config={chartConfig}
          className={cn('mx-auto h-75 w-full', composedClassName)}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey={xKey as string}
                stroke={xAxis.stroke}
                tick={{
                  fill: xAxis.tickColor,
                  fontSize: xAxis.fontSize,
                  fontWeight: xAxis.fontWeight,
                }}
              />
              <YAxis
                stroke={yAxis.stroke}
                tick={{
                  fill: yAxis.tickColor,
                  fontSize: yAxis.fontSize,
                  fontWeight: yAxis.fontWeight,
                }}
              />

              <ChartTooltip cursor content={<ChartTooltipContent />} />

              {/* Render multiple bars */}
              {barKeys.map((key, index) => (
                <Bar
                  key={`bar-${key as string}`}
                  dataKey={key as string}
                  barSize={barSize}
                  radius={barRadius}
                  fill={
                    defaultChartStyle?.colors[
                      index % defaultChartStyle.colors.length
                    ]
                  }
                />
              ))}

              {/* Render multiple areas */}
              {areaKeys.map((key, index) => (
                <Area
                  key={`area-${key as string}`}
                  type="monotone"
                  dataKey={key as string}
                  fill={
                    defaultChartStyle?.colors[
                      (index + barKeys.length) % defaultChartStyle.colors.length
                    ]
                  }
                  stroke={
                    defaultChartStyle?.colors[
                      (index + barKeys.length) % defaultChartStyle.colors.length
                    ]
                  }
                  fillOpacity={areaFillOpacity}
                />
              ))}

              {/* Render multiple lines */}
              {lineKeys.map((key, index) => (
                <Line
                  key={`line-${key as string}`}
                  type="monotone"
                  dataKey={key as string}
                  stroke={
                    defaultChartStyle?.colors[
                      (index + barKeys.length + areaKeys.length) %
                        defaultChartStyle.colors.length
                    ]
                  }
                  strokeWidth={lineStrokeWidth}
                  dot={lineDot}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
