'use client'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import type { TLabelKey, TNumericKey } from './chart-type'
import type { HTMLProps } from 'react'
import { cn } from '@/lib/utils'

type LineDatumBase = Record<string, unknown>

// Specific config for LineChart
export interface LineChartConfig {
  type?: 'monotone' | 'linear' | 'step' | 'basis' | 'natural'
  strokeWidth?: number
  dot?: boolean
  color?: string

  // Axis styling
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
type TCustomLineChartProps<T extends LineDatumBase> = {
  chartConfig?: any
  lineConfig?: LineChartConfig
  chartData: T[]
  xKey: TLabelKey<T>
  dataKey: TNumericKey<T>
  className?: HTMLProps<HTMLDivElement>['className']
}

export function CustomLineChart<T extends LineDatumBase>({
  chartConfig = {},
  lineConfig = {},
  chartData,
  xKey,
  dataKey,
  className = '',
}: TCustomLineChartProps<T>) {
  const {
    type = 'monotone',
    strokeWidth = 2,
    dot = false,
    color = '#4f46e5',
    xAxis = {},
    yAxis = {},
  } = lineConfig

  return (
    <ChartContainer
      config={chartConfig}
      className={cn('mx-auto w-full h-75', className)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
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

          <Line
            type={type}
            dataKey={dataKey as string}
            stroke={color}
            strokeWidth={strokeWidth}
            dot={dot}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
