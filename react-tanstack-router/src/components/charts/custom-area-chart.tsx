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
import type { IAxisStyle, TLabelKey, TNumericKey } from './chart-type'
import type { HTMLProps } from 'react'
import { cn } from '@/lib/utils'
import { defaultChartStyle } from './chart-utils'

type AreaDatumBase = Record<string, unknown>

// Specific config for AreaChart
export interface AreaChartConfig {
  type?: 'monotone' | 'linear' | 'step' | 'basis' | 'natural'
  strokeWidth?: number
  fillOpacity?: number
  color?: string
  // Axis styling moved here
  xAxis?: IAxisStyle
  yAxis?: IAxisStyle
  className?: HTMLProps<HTMLDivElement>['className']
}

// Props
type TCustomAreaChartProps<T extends AreaDatumBase> = {
  chartConfig?: any
  areaConfig?: AreaChartConfig
  chartData: T[]
  xKey: TLabelKey<T>
  dataKey: TNumericKey<T> | TNumericKey<T>[] // Support single or multiple keys
  className?: HTMLProps<HTMLDivElement>['className']
  title?: string
}

export function CustomAreaChart<T extends AreaDatumBase>({
  chartConfig = {},
  areaConfig = {},
  chartData,
  xKey,
  dataKey,
  className = '',
  title = '',
}: TCustomAreaChartProps<T>) {
  const {
    type = 'monotone',
    strokeWidth = 2,
    fillOpacity = 0.2,
    color = defaultChartStyle.color,
    xAxis = defaultChartStyle.xAxis,
    yAxis = defaultChartStyle.yAxis,
    className: areaClassName = '',
  } = areaConfig

  // Convert dataKey to array for consistent handling
  const dataKeys = Array.isArray(dataKey) ? dataKey : [dataKey]

  return (
    <div className={cn('rounded-lg border p-6', className)}>
      <div>
        {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}
        <ChartContainer
          config={chartConfig}
          className={cn('mx-auto h-75 w-full', areaClassName)}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
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
                <Area
                  key={key as string}
                  type={type}
                  dataKey={key as string}
                  stroke={
                    defaultChartStyle?.colors?.[
                      index % (defaultChartStyle?.colors?.length || 1)
                    ] || color
                  }
                  fill={
                    defaultChartStyle?.colors?.[
                      index % (defaultChartStyle?.colors?.length || 1)
                    ] || color
                  }
                  strokeWidth={strokeWidth}
                  fillOpacity={fillOpacity}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
