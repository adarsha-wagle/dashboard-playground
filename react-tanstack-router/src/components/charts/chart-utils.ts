import type { ChartStyle } from './chart-type'

export const defaultChartColors = [
  '#6366F1', // Indigo
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#10B981', // Emerald Green
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#F43F5E', // Rose
  '#14B8A6', // Teal
  '#FACC15', // Yellow
  '#22D3EE', // Cyan
  '#F97316', // Orange
]

export const defaultChartStyle: ChartStyle = {
  width: 500,
  height: 300,
  colors: defaultChartColors,
  color: defaultChartColors[0],
  xAxis: {
    stroke: '#888',
    tickColor: '#555',
    fontSize: 12,
    fontWeight: 'bold',
  },
  yAxis: {
    stroke: '#888',
    tickColor: '#555',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tooltip: { enabled: true, backgroundColor: '#fff', textColor: '#000' },
  legend: { enabled: true, position: 'top', textColor: '#000', fontSize: 12 },
  backgroundColor: '#fff',
}
