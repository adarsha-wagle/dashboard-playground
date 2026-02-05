// CustomBarChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { CustomBarChart } from './custom-bar-chart'

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
const meta: Meta<typeof CustomBarChart> = {
  title: 'Charts/BarChart',
  component: CustomBarChart,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta

// --- Stories ---

// Single series
export const Default: StoryObj<
  typeof CustomBarChart<{ month: string; revenue: number }>
> = {
  args: {
    chartData: salesData,
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Monthly Revenue',
  },
}

// Multiple series
export const MultiSeries: StoryObj<
  typeof CustomBarChart<{
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

// Custom bar size and radius
export const CustomBarStyle: StoryObj<
  typeof CustomBarChart<{ month: string; revenue: number }>
> = {
  args: {
    chartData: salesData,
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Custom Bar Style',
    barConfig: {
      barSize: 40,
      radius: [8, 8, 0, 0],
    },
  },
}

// Custom axis styling
export const CustomAxisStyling: StoryObj<
  typeof CustomBarChart<{ month: string; revenue: number }>
> = {
  args: {
    chartData: salesData,
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Custom Axis Styling',
    barConfig: {
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
  typeof CustomBarChart<{ month: string; revenue: number }>
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
  typeof CustomBarChart<{ month: string; revenue: number }>
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
  typeof CustomBarChart<{ day: string; value: number }>
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
