import type { Meta, StoryObj } from '@storybook/react'
import { CustomLineChart } from './custom-line-chart'

const meta: Meta<typeof CustomLineChart> = {
  title: 'Charts/CustomLineChart',
  component: CustomLineChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

// Sample data sets
const monthlyRevenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4780 },
  { month: 'May', revenue: 5890 },
  { month: 'Jun', revenue: 6200 },
]

const multiMetricData = [
  { month: 'Jan', sales: 4000, profit: 2400, expenses: 1600 },
  { month: 'Feb', sales: 3000, profit: 1398, expenses: 1602 },
  { month: 'Mar', sales: 5000, profit: 2800, expenses: 2200 },
  { month: 'Apr', sales: 4780, profit: 3908, expenses: 872 },
  { month: 'May', sales: 5890, profit: 4800, expenses: 1090 },
  { month: 'Jun', sales: 6200, profit: 4500, expenses: 1700 },
]

const temperatureData = [
  { time: '00:00', temp: 18 },
  { time: '04:00', temp: 15 },
  { time: '08:00', temp: 20 },
  { time: '12:00', temp: 28 },
  { time: '16:00', temp: 30 },
  { time: '20:00', temp: 24 },
  { time: '23:59', temp: 19 },
]

const quarterlyGrowthData = [
  { quarter: 'Q1 2023', growth: 12 },
  { quarter: 'Q2 2023', growth: 15 },
  { quarter: 'Q3 2023', growth: 10 },
  { quarter: 'Q4 2023', growth: 18 },
  { quarter: 'Q1 2024', growth: 22 },
  { quarter: 'Q2 2024', growth: 25 },
]

// Single line chart
export const SingleLine: StoryObj<
  typeof CustomLineChart<{
    month: string
    revenue: number
  }>
> = {
  args: {
    chartData: monthlyRevenueData,
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Monthly Revenue',
  },
}

// Multiple lines
export const MultipleLines: StoryObj<
  typeof CustomLineChart<{
    month: string
    sales: number
    profit: number
    expenses: number
  }>
> = {
  args: {
    chartData: multiMetricData,
    xKey: 'month',
    dataKey: ['sales', 'profit', 'expenses'],
    title: 'Sales, Profit & Expenses',
  },
}

// Two lines comparison
export const TwoLinesComparison: StoryObj<
  typeof CustomLineChart<{
    month: string
    sales: number
    profit: number
  }>
> = {
  args: {
    chartData: multiMetricData,
    xKey: 'month',
    dataKey: ['sales', 'profit'],
    title: 'Sales vs Profit',
  },
}

// With dots
export const WithDots: StoryObj<
  typeof CustomLineChart<{
    time: string
    temp: number
  }>
> = {
  args: {
    chartData: temperatureData,
    xKey: 'time',
    dataKey: 'temp',
    title: 'Temperature Throughout the Day',
    lineConfig: {
      dot: true,
    },
  },
}

// Linear type
export const LinearType: StoryObj<
  typeof CustomLineChart<{
    quarter: string
    growth: number
  }>
> = {
  args: {
    chartData: quarterlyGrowthData,
    xKey: 'quarter',
    dataKey: 'growth',
    title: 'Quarterly Growth (Linear)',
    lineConfig: {
      type: 'linear',
      dot: true,
    },
  },
}

// Step type
export const StepType: StoryObj<
  typeof CustomLineChart<{
    quarter: string
    growth: number
  }>
> = {
  args: {
    chartData: quarterlyGrowthData,
    xKey: 'quarter',
    dataKey: 'growth',
    title: 'Quarterly Growth (Step)',
    lineConfig: {
      type: 'step',
    },
  },
}

// Basis type
export const BasisType: StoryObj<
  typeof CustomLineChart<{
    month: string
    revenue: number
  }>
> = {
  args: {
    chartData: monthlyRevenueData,
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Monthly Revenue (Basis)',
    lineConfig: {
      type: 'basis',
    },
  },
}

// Natural type
export const NaturalType: StoryObj<
  typeof CustomLineChart<{
    time: string
    temp: number
  }>
> = {
  args: {
    chartData: temperatureData,
    xKey: 'time',
    dataKey: 'temp',
    title: 'Temperature (Natural Curve)',
    lineConfig: {
      type: 'natural',
      strokeWidth: 3,
    },
  },
}

// Custom styling
export const CustomStyling: StoryObj<
  typeof CustomLineChart<{
    month: string
    revenue: number
  }>
> = {
  args: {
    chartData: monthlyRevenueData,
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Styled Line Chart',
    lineConfig: {
      strokeWidth: 4,
      dot: true,
      type: 'monotone',
    },
  },
}

// No title
export const WithoutTitle: StoryObj<
  typeof CustomLineChart<{
    month: string
    revenue: number
  }>
> = {
  args: {
    chartData: monthlyRevenueData,
    xKey: 'month',
    dataKey: 'revenue',
  },
}

// Large dataset
export const LargeDataset: StoryObj<
  typeof CustomLineChart<{
    day: string
    value: number
  }>
> = {
  args: {
    chartData: Array.from({ length: 30 }, (_, i) => ({
      day: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 1000) + 500,
    })),
    xKey: 'day',
    dataKey: 'value',
    title: 'Daily Values (30 Days)',
  },
}

// Multiple lines with large dataset
export const MultipleLinesLargeDataset: StoryObj<
  typeof CustomLineChart<{
    week: string
    metric1: number
    metric2: number
    metric3: number
  }>
> = {
  args: {
    chartData: Array.from({ length: 52 }, (_, i) => ({
      week: `W${i + 1}`,
      metric1: Math.floor(Math.random() * 5000) + 2000,
      metric2: Math.floor(Math.random() * 4000) + 1500,
      metric3: Math.floor(Math.random() * 3000) + 1000,
    })),
    xKey: 'week',
    dataKey: ['metric1', 'metric2', 'metric3'],
    title: 'Annual Metrics (52 Weeks)',
  },
}

// Minimal data
export const MinimalData: StoryObj<
  typeof CustomLineChart<{
    period: string
    value: number
  }>
> = {
  args: {
    chartData: [
      { period: 'Start', value: 100 },
      { period: 'End', value: 150 },
    ],
    xKey: 'period',
    dataKey: 'value',
    title: 'Before vs After',
  },
}

// Custom className
export const CustomClassName: StoryObj<
  typeof CustomLineChart<{
    month: string
    revenue: number
  }>
> = {
  args: {
    chartData: monthlyRevenueData,
    xKey: 'month',
    dataKey: 'revenue',
    title: 'Custom Styled Chart',
    className: 'h-96 shadow-lg bg-slate-50',
  },
}

// Thick stroke with dots
export const ThickStrokeWithDots: StoryObj<
  typeof CustomLineChart<{
    month: string
    sales: number
    profit: number
  }>
> = {
  args: {
    chartData: multiMetricData,
    xKey: 'month',
    dataKey: ['sales', 'profit'],
    title: 'Bold Lines with Data Points',
    lineConfig: {
      strokeWidth: 4,
      dot: true,
      type: 'monotone',
    },
  },
}
