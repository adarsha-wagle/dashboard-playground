'use client'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import type { TLabelKey, TNumericKey } from './chart-type'
import type { HTMLProps } from 'react'
import { cn } from '@/lib/utils'

type AreaDatumBase = Record<string, unknown>

// Specific config for AreaChart
export interface AreaChartConfig {
  type?: 'monotone' | 'linear' | 'step' | 'basis' | 'natural'
  strokeWidth?: number
  fillOpacity?: number
  color?: string

  // Axis styling moved here
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
type TCustomAreaChartProps<T extends AreaDatumBase> = {
  chartConfig?: any // keep shared chartConfig if needed
  areaConfig?: AreaChartConfig
  chartData: T[]
  xKey: TLabelKey<T>
  dataKey: TNumericKey<T>
  className?: HTMLProps<HTMLDivElement>['className']
}

export function CustomAreaChart<T extends AreaDatumBase>({
  chartConfig = {},
  areaConfig = {},
  chartData,
  xKey,
  dataKey,
  className = '',
}: TCustomAreaChartProps<T>) {
  const {
    type = 'monotone',
    strokeWidth = 2,
    fillOpacity = 0.2,
    color = '#8884d8',
    xAxis = {},
    yAxis = {},
  } = areaConfig

  return (
    <ChartContainer
      config={chartConfig}
      className={cn('mx-auto w-full h-75', className)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
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

          <Area
            type={type}
            dataKey={dataKey as string}
            stroke={color}
            fill={color}
            strokeWidth={strokeWidth}
            fillOpacity={fillOpacity}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
