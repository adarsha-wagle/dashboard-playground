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
import type { IAxisStyle, TLabelKey, TNumericKey } from './chart-type'
import type { HTMLProps } from 'react'
import { cn } from '@/lib/utils'
import { defaultChartStyle } from './chart-utils'

type LineDatumBase = Record<string, unknown>

// Specific config for LineChart
export interface LineChartConfig {
  type?: 'monotone' | 'linear' | 'step' | 'basis' | 'natural'
  strokeWidth?: number
  dot?: boolean
  color?: string

  // Axis styling
  xAxis?: IAxisStyle
  yAxis?: IAxisStyle
}

// Props
type TCustomLineChartProps<T extends LineDatumBase> = {
  chartConfig?: any
  lineConfig?: LineChartConfig
  chartData: T[]
  xKey: TLabelKey<T>
  dataKey: TNumericKey<T> | TNumericKey<T>[] // Support single or multiple keys
  className?: HTMLProps<HTMLDivElement>['className']
  title?: string
}

export function CustomLineChart<T extends LineDatumBase>({
  chartConfig = {},
  lineConfig = {},
  chartData,
  xKey,
  dataKey,
  className = '',
  title = '',
}: TCustomLineChartProps<T>) {
  const {
    type = 'monotone',
    strokeWidth = 2,
    dot = false,
    color = defaultChartStyle.color,
    xAxis = defaultChartStyle.xAxis,
    yAxis = defaultChartStyle.yAxis,
  } = lineConfig

  // Convert dataKey to array for consistent handling
  const dataKeys = Array.isArray(dataKey) ? dataKey : [dataKey]

  return (
    <div className="border p-6 rounded-lg">
      <div>
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}

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

              {dataKeys.map((key, index) => (
                <Line
                  key={key as string}
                  type={type}
                  dataKey={key as string}
                  stroke={
                    defaultChartStyle?.colors?.[
                      index % (defaultChartStyle?.colors?.length || 1)
                    ] || color
                  }
                  strokeWidth={strokeWidth}
                  dot={dot}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
