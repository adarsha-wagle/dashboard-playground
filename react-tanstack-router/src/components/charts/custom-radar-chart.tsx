'use client'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import type { TLabelKey, TNumericKey } from './chart-type'
import type { HTMLProps } from 'react'
import { cn } from '@/lib/utils'
import { defaultChartStyle } from './chart-utils'

type RadarDatumBase = Record<string, unknown>

// Specific config for RadarChart
export interface RadarChartConfig {
  fillOpacity?: number
  strokeWidth?: number
  dot?: boolean
  className?: HTMLProps<HTMLDivElement>['className']
}

// Props
type TCustomRadarChartProps<T extends RadarDatumBase> = {
  chartConfig?: any
  radarConfig?: RadarChartConfig
  chartData: T[]
  angleKey: TLabelKey<T> // The category/dimension (e.g., 'subject', 'skill')
  dataKey: TNumericKey<T> | TNumericKey<T>[] // Support single or multiple data series
  className?: HTMLProps<HTMLDivElement>['className']
  title?: string
}

export function CustomRadarChart<T extends RadarDatumBase>({
  chartConfig = {},
  radarConfig = {},
  chartData,
  angleKey,
  dataKey,
  className = '',
  title = '',
}: TCustomRadarChartProps<T>) {
  const {
    fillOpacity = 0.3,
    strokeWidth = 2,
    dot = true,
    className: radarClassName = '',
  } = radarConfig

  // Convert dataKey to array for consistent handling
  const dataKeys = Array.isArray(dataKey) ? dataKey : [dataKey]

  return (
    <div className={cn('border p-6 rounded-lg', className)}>
      <div>
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}

        <ChartContainer
          config={chartConfig}
          className={cn('mx-auto w-full h-75', radarClassName)}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid />

              <PolarAngleAxis
                dataKey={angleKey as string}
                tick={{ fill: defaultChartStyle.xAxis.tickColor }}
              />

              <PolarRadiusAxis
                angle={90}
                tick={{ fill: defaultChartStyle.yAxis.tickColor }}
              />

              <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />

              {dataKeys.map((key, index) => {
                const color =
                  defaultChartStyle?.colors[
                    index % defaultChartStyle.colors.length
                  ]

                return (
                  <Radar
                    key={key as string}
                    name={key as string}
                    dataKey={key as string}
                    stroke={color}
                    fill={color}
                    fillOpacity={fillOpacity}
                    strokeWidth={strokeWidth}
                    dot={dot}
                  />
                )
              })}
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
