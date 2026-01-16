'use client'

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
import type { TLabelKey, TNumericKey } from './chart-type'
import type { HTMLProps } from 'react'
import { cn } from '@/lib/utils'

type ComposedDatumBase = Record<string, unknown>

// Specific config for ComposedChart
export interface ComposedChartConfig {
  barSize?: number
  barRadius?: [number, number, number, number]
  barColor?: string
  lineStrokeWidth?: number
  lineColor?: string
  lineDot?: boolean
  areaFillOpacity?: number
  areaColor?: string

  xAxis?: {
    stroke?: string
    tickColor?: string
    fontSize?: number
  }
  yAxis?: {
    stroke?: string
    tickColor?: string
    fontSize?: number
  }
}

// Props
type TCustomComposedChartProps<T extends ComposedDatumBase> = {
  chartConfig?: any
  composedConfig?: ComposedChartConfig
  chartData: T[]
  xKey: TLabelKey<T>
  barKey?: TNumericKey<T>
  lineKey?: TNumericKey<T>
  areaKey?: TNumericKey<T>
  className?: HTMLProps<HTMLDivElement>['className']
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
}: TCustomComposedChartProps<T>) {
  const {
    barSize = 20,
    barRadius = [4, 4, 0, 0],
    barColor = '#4f46e5',
    lineStrokeWidth = 2,
    lineColor = '#4f46e5',
    lineDot = false,
    areaFillOpacity = 0.2,
    areaColor = '#4f46e5',
    xAxis = {},
    yAxis = {},
  } = composedConfig

  return (
    <ChartContainer
      config={chartConfig}
      className={cn('mx-auto w-full h-80', className)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey={xKey as string}
            stroke={xAxis.stroke}
            tick={{ fill: xAxis.tickColor, fontSize: xAxis.fontSize }}
          />
          <YAxis
            stroke={yAxis.stroke}
            tick={{ fill: yAxis.tickColor, fontSize: yAxis.fontSize }}
          />

          <ChartTooltip
            cursor
            content={
              <ChartTooltipContent className="bg-white dark:bg-primaryBlack text-themePink dark:text-primaryWhite" />
            }
          />

          {barKey && (
            <Bar
              dataKey={barKey as string}
              barSize={barSize}
              radius={barRadius}
              fill={barColor}
            />
          )}

          {areaKey && (
            <Area
              type="monotone"
              dataKey={areaKey as string}
              fill={areaColor}
              fillOpacity={areaFillOpacity}
            />
          )}

          {lineKey && (
            <Line
              type="monotone"
              dataKey={lineKey as string}
              stroke={lineColor}
              strokeWidth={lineStrokeWidth}
              dot={lineDot}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
