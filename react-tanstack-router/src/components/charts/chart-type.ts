export type TNumericKey<T> = {
  [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

export type TLabelKey<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]

// chart-common.ts
export interface IAxisStyle {
  stroke?: string // axis line color
  tickColor?: string // tick text color
  fontSize?: number // tick font size
  fontWeight?: string | number
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
  colors: string[] // color palette for charts
  xAxis: IAxisStyle
  yAxis: IAxisStyle
  tooltip?: TooltipStyle
  legend?: LegendStyle
  backgroundColor?: string
  color?: string
}
