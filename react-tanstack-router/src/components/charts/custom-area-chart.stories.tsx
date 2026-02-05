import type { Meta, StoryObj } from '@storybook/react'
import { CustomAreaChart } from './custom-area-chart'

// Sample data
const salesData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
]

const multiSeriesData = [
  { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { month: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { month: 'Mar', revenue: 5000, expenses: 3800, profit: 1200 },
  { month: 'Apr', revenue: 4500, expenses: 3908, profit: 592 },
  { month: 'May', revenue: 6000, expenses: 4800, profit: 1200 },
  { month: 'Jun', revenue: 5500, expenses: 3800, profit: 1700 },
]

// Storybook meta
const meta: Meta<typeof CustomAreaChart> = {
  title: 'Charts/AreaChart',
  component: CustomAreaChart,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta

// --- Stories ---

// Single series
export const Default: StoryObj<
  typeof CustomAreaChart<{ month: string; revenue: number }>
> = {
  args: {
    chartData: salesData,
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Monthly Revenue',
  },
}

// Multiple data series
export const MultiSeries: StoryObj<
  typeof CustomAreaChart<{
    month: string
    revenue: number
    expenses: number
    profit: number
  }>
> = {
  args: {
    chartData: multiSeriesData,
    xKey: 'month',
    dataKey: ['revenue', 'expenses', 'profit'],
    title: 'Financial Overview',
  },
}

// Linear interpolation
export const LinearType: StoryObj<
  typeof CustomAreaChart<{ month: string; revenue: number }>
> = {
  args: {
    chartData: salesData,
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Linear Interpolation',
    areaConfig: { type: 'linear' },
  },
}

// Step chart
export const StepType: StoryObj<
  typeof CustomAreaChart<{ month: string; revenue: number }>
> = {
  args: {
    chartData: salesData,
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Step Chart',
    areaConfig: { type: 'step' },
  },
}

// Custom colors and styling
export const CustomColors: StoryObj<
  typeof CustomAreaChart<{ month: string; revenue: number }>
> = {
  args: {
    chartData: salesData,
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Custom Styled Chart',
    areaConfig: {
      color: '#8b5cf6',
      fillOpacity: 0.4,
      strokeWidth: 3,
    },
  },
}

// Custom axis styling
export const CustomAxisStyling: StoryObj<
  typeof CustomAreaChart<{ month: string; revenue: number }>
> = {
  args: {
    chartData: salesData,
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Custom Axis Styling',
    areaConfig: {
      xAxis: {
        stroke: '#64748b',
        tickColor: '#475569',
        fontSize: 14,
        fontWeight: 600,
      },
      yAxis: { stroke: '#64748b', tickColor: '#475569', fontSize: 12 },
    },
  },
}

// Empty data
export const EmptyData: StoryObj<
  typeof CustomAreaChart<{ month: string; revenue: number }>
> = {
  args: {
    chartData: [],
    xKey: 'month',
    dataKey: 'revenue',
    title: 'No Data Available',
  },
}

// Single data point
export const SingleDataPoint: StoryObj<
  typeof CustomAreaChart<{ month: string; revenue: number }>
> = {
  args: {
    chartData: [{ month: 'Jan', revenue: 4000 }],
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Single Data Point',
  },
}

// Large dataset
export const LargeDataset: StoryObj<
  typeof CustomAreaChart<{ day: string; value: number }>
> = {
  args: {
    chartData: Array.from({ length: 365 }, (_, i) => ({
      day: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 10000) + 1000,
    })),
    xKey: 'day',
    dataKey: 'value',
    title: 'Year of Daily Data',
  },
}
