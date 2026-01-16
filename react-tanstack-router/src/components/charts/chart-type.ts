export type TNumericKey<T> = {
  [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

export type TLabelKey<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]

// chart-common.ts
export interface AxisStyle {
  stroke?: string // axis line color
  tickColor?: string // tick text color
  fontSize?: number // tick font size
}

export interface TooltipStyle {
  enabled?: boolean
  backgroundColor?: string
  textColor?: string
}

export interface LegendStyle {
  enabled?: boolean
  position?: 'top' | 'bottom' | 'left' | 'right'
  textColor?: string
  fontSize?: number
}

export interface ChartStyle {
  width?: number
  height?: number
  colors?: string[] // color palette for charts
  xAxis?: AxisStyle
  yAxis?: AxisStyle
  tooltip?: TooltipStyle
  legend?: LegendStyle
  backgroundColor?: string
}

export const defaultChartStyle: ChartStyle = {
  width: 500,
  height: 300,
  colors: ['#4f46e5', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
  xAxis: { stroke: '#888', tickColor: '#555', fontSize: 12 },
  yAxis: { stroke: '#888', tickColor: '#555', fontSize: 12 },
  tooltip: { enabled: true, backgroundColor: '#fff', textColor: '#000' },
  legend: { enabled: true, position: 'top', textColor: '#000', fontSize: 12 },
  backgroundColor: '#fff',
}
