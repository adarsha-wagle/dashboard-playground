'use client'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import type { TLabelKey, TNumericKey } from './chart-type'
import type { HTMLProps } from 'react'
import { cn } from '@/lib/utils'

type BarDatumBase = Record<string, unknown>

// Specific config for BarChart
export interface BarChartConfig {
  barSize?: number
  radius?: [number, number, number, number]
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
type TCustomBarChartProps<T extends BarDatumBase> = {
  chartConfig?: any
  barConfig?: BarChartConfig
  chartData: T[]
  xKey: TLabelKey<T>
  dataKey: TNumericKey<T>
  className?: HTMLProps<HTMLDivElement>['className']
}

export function CustomBarChart<T extends BarDatumBase>({
  chartConfig = {},
  barConfig = {},
  chartData,
  xKey,
  dataKey,
  className = '',
}: TCustomBarChartProps<T>) {
  const {
    barSize = 20,
    radius = [4, 4, 0, 0],
    color = '#4f46e5',
    xAxis = {},
    yAxis = {},
  } = barConfig

  return (
    <ChartContainer
      config={chartConfig}
      className={cn('mx-auto w-full h-75', className)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
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

          <Bar
            dataKey={dataKey as string}
            barSize={barSize}
            radius={radius}
            fill={color}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
