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
import type { TNumericKey } from './chart-type'
import type { HTMLProps } from 'react'
import { cn } from '@/lib/utils'

type ScatterDatumBase = Record<string, unknown>

// Specific config for ScatterChart
export interface ScatterChartConfig {
  pointSize?: number
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
type TCustomScatterChartProps<T extends ScatterDatumBase> = {
  chartConfig?: any
  scatterConfig?: ScatterChartConfig
  chartData: T[]
  xKey: TNumericKey<T>
  yKey: TNumericKey<T>
  className?: HTMLProps<HTMLDivElement>['className']
}

export function CustomScatterChart<T extends ScatterDatumBase>({
  chartConfig = {},
  scatterConfig = {},
  chartData,
  xKey,
  yKey,
  className = '',
}: TCustomScatterChartProps<T>) {
  const {
    pointSize = 6,
    color = '#4f46e5',
    xAxis = {},
    yAxis = {},
  } = scatterConfig

  return (
    <ChartContainer
      config={chartConfig}
      className={cn('mx-auto w-full h-75', className)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey={xKey as string}
            type="number"
            stroke={xAxis.stroke}
            tick={{ fill: xAxis.tickColor, fontSize: xAxis.fontSize }}
          />
          <YAxis
            dataKey={yKey as string}
            type="number"
            stroke={yAxis.stroke}
            tick={{ fill: yAxis.tickColor, fontSize: yAxis.fontSize }}
          />

          <ChartTooltip
            cursor
            content={
              <ChartTooltipContent className="bg-white dark:bg-primaryBlack text-themePink dark:text-primaryWhite" />
            }
          />

          <Scatter data={chartData} fill={color} line={{}} shape="circle" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
