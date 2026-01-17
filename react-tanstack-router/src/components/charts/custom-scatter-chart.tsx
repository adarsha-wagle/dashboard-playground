'use client'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from 'recharts'
import type { IAxisStyle, TNumericKey } from './chart-type'
import type { HTMLProps } from 'react'
import { cn } from '@/lib/utils'
import { defaultChartStyle } from './chart-utils'

type ScatterDatumBase = Record<string, unknown>

// Specific config for ScatterChart
export interface ScatterChartConfig {
  pointSize?: number

  // Axis styling
  xAxis?: IAxisStyle
  yAxis?: IAxisStyle
  className?: HTMLProps<HTMLDivElement>['className']
}

// Single scatter series configuration
export interface ScatterSeries<T> {
  data: T[]
  xKey: TNumericKey<T>
  yKey: TNumericKey<T>
  name?: string
}

// Props
type TCustomScatterChartProps<T extends ScatterDatumBase> = {
  chartConfig?: any
  scatterConfig?: ScatterChartConfig
  // Support both single series (backward compatible) and multiple series
  chartData?: T[]
  xKey?: TNumericKey<T>
  yKey?: TNumericKey<T>
  // New: multiple series support
  series?: ScatterSeries<T>[]
  className?: HTMLProps<HTMLDivElement>['className']
  title?: string
}

export function CustomScatterChart<T extends ScatterDatumBase>({
  chartConfig = {},
  scatterConfig = {},
  chartData,
  xKey,
  yKey,
  series,
  className = '',
  title = '',
}: TCustomScatterChartProps<T>) {
  const {
    xAxis = defaultChartStyle.xAxis,
    yAxis = defaultChartStyle.yAxis,
    className: scatterClassName = '',
  } = scatterConfig

  // Build series array - backward compatible with single dataset
  const scatterSeries: ScatterSeries<T>[] =
    series ||
    (chartData && xKey && yKey
      ? [{ data: chartData, xKey, yKey, name: 'Series 1' }]
      : [])

  return (
    <div className={cn('border p-6 rounded-lg', className)}>
      <div>
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <ChartContainer
          config={chartConfig}
          className={cn('mx-auto w-full h-75', scatterClassName)}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                type="number"
                dataKey="x"
                stroke={xAxis.stroke}
                tick={{
                  fill: xAxis.tickColor,
                  fontSize: xAxis.fontSize,
                  fontWeight: xAxis.fontWeight,
                }}
                name={(scatterSeries[0]?.xKey as string) || 'X'}
              />
              <YAxis
                type="number"
                dataKey="y"
                stroke={yAxis.stroke}
                tick={{
                  fill: yAxis.tickColor,
                  fontSize: yAxis.fontSize,
                  fontWeight: yAxis.fontWeight,
                }}
                name={(scatterSeries[0]?.yKey as string) || 'Y'}
              />

              <ChartTooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={<ChartTooltipContent indicator="dot" />}
              />

              {scatterSeries.map((s, index) => {
                const color =
                  defaultChartStyle?.colors[
                    index % defaultChartStyle.colors.length
                  ]

                // Transform data and add color to each point
                const transformedData = s.data.map((item) => ({
                  ...item,
                  x: item[s.xKey],
                  y: item[s.yKey],
                  fill: color, // Add fill color to each data point
                }))

                return (
                  <Scatter
                    key={s.name || `scatter-${index}`}
                    name={s.name || `Series ${index + 1}`}
                    data={transformedData}
                    fill={color}
                    shape="circle"
                  />
                )
              })}
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
