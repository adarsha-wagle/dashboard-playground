import type { Meta, StoryObj } from '@storybook/react'
import { CustomComposedChart } from './custom-composed-chart'

const meta: Meta<typeof CustomComposedChart> = {
  title: 'Charts/CustomComposedChart',
  component: CustomComposedChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CustomComposedChart>

// Sample data sets
const salesProfitData = [
  { month: 'Jan', sales: 4000, profit: 2400 },
  { month: 'Feb', sales: 3000, profit: 1398 },
  { month: 'Mar', sales: 5000, profit: 2800 },
  { month: 'Apr', sales: 4780, profit: 3908 },
  { month: 'May', sales: 5890, profit: 4800 },
]

const composedBusinessMetrics = [
  { month: 'Jan', revenue: 12000, expenses: 8000, users: 450, growth: 320 },
  { month: 'Feb', revenue: 15000, expenses: 9500, users: 520, growth: 380 },
  { month: 'Mar', revenue: 13000, expenses: 8800, users: 4800, growth: 340 },
  { month: 'Apr', revenue: 18000, expenses: 11000, users: 6300, growth: 450 },
  { month: 'May', revenue: 16000, expenses: 10200, users: 5800, growth: 410 },
  { month: 'Jun', revenue: 20000, expenses: 12500, users: 7200, growth: 520 },
]

const quarterlyData = [
  { quarter: 'Q1', revenue: 45000, target: 50000, growth: 12 },
  { quarter: 'Q2', revenue: 52000, target: 55000, growth: 15 },
  { quarter: 'Q3', revenue: 48000, target: 53000, growth: 10 },
  { quarter: 'Q4', revenue: 61000, target: 60000, growth: 18 },
]

// Basic story with bar and line
export const BarAndLine: StoryObj<
  typeof CustomComposedChart<{
    month: string
    sales: number
    profit: number
  }>
> = {
  args: {
    chartData: salesProfitData,
    xKey: 'month',
    barKey: 'sales',
    lineKey: 'profit',
    title: 'Sales and Profit',
  },
}

// Multiple bars
export const MultipleBars: StoryObj<
  typeof CustomComposedChart<{
    month: string
    revenue: number
    expenses: number
  }>
> = {
  args: {
    chartData: composedBusinessMetrics,
    xKey: 'month',
    barKey: ['revenue', 'expenses'],
    title: 'Revenue vs Expenses',
  },
}

// Multiple lines
export const MultipleLines: StoryObj<
  typeof CustomComposedChart<{
    month: string
    users: number
    growth: number
  }>
> = {
  args: {
    chartData: composedBusinessMetrics,
    xKey: 'month',
    lineKey: ['users', 'growth'],
    title: 'User Growth Metrics',
  },
}

// Area chart
export const AreaChart: StoryObj<
  typeof CustomComposedChart<{
    month: string
    sales: number
    profit: number
  }>
> = {
  args: {
    chartData: salesProfitData,
    xKey: 'month',
    areaKey: ['sales', 'profit'],
    title: 'Sales and Profit Area',
  },
}

// All types combined
export const AllTypesComposed: StoryObj<
  typeof CustomComposedChart<{
    month: string
    revenue: number
    expenses: number
    users: number
    growth: number
  }>
> = {
  args: {
    chartData: composedBusinessMetrics,
    xKey: 'month',
    barKey: ['revenue', 'expenses'],
    areaKey: 'growth',
    lineKey: 'users',
    title: 'Complete Business Metrics',
  },
}

// With custom configuration
export const CustomStyling: StoryObj<
  typeof CustomComposedChart<{
    quarter: string
    target: number
    revenue: number
    growth: number
  }>
> = {
  args: {
    chartData: quarterlyData,
    xKey: 'quarter',
    barKey: 'revenue',
    lineKey: ['target', 'growth'],
    title: 'Quarterly Performance',
    composedConfig: {
      barSize: 50,
      barRadius: [8, 8, 0, 0],
      lineStrokeWidth: 3,
      lineDot: true,
      areaFillOpacity: 0.3,
    },
  },
}

// No title
export const WithoutTitle: StoryObj<
  typeof CustomComposedChart<{
    month: string
    sales: number
    profit: number
  }>
> = {
  args: {
    chartData: salesProfitData,
    xKey: 'month',
    barKey: 'sales',
    lineKey: 'profit',
  },
}

// Large dataset
export const LargeDataset: StoryObj<
  typeof CustomComposedChart<{
    value1: number
    value2: number
    value3: number
    month: string
  }>
> = {
  args: {
    chartData: Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i).toLocaleString('default', { month: 'short' }),
      value1: Math.floor(Math.random() * 10000) + 5000,
      value2: Math.floor(Math.random() * 8000) + 3000,
      value3: Math.floor(Math.random() * 500) + 200,
    })),
    xKey: 'month',
    barKey: ['value1', 'value2'],
    lineKey: 'value3',
    title: 'Annual Overview',
  },
}

// Minimal data
export const MinimalData: StoryObj<
  typeof CustomComposedChart<{
    period: string
    metric: number
  }>
> = {
  args: {
    chartData: [
      { period: 'Before', metric: 100 },
      { period: 'After', metric: 150 },
    ],
    xKey: 'period',
    barKey: 'metric',
    title: 'Before vs After',
  },
}

// Custom className
export const CustomClassName: StoryObj<
  typeof CustomComposedChart<{
    month: string
    sales: number
    profit: number
  }>
> = {
  args: {
    chartData: salesProfitData,
    xKey: 'month',
    barKey: 'sales',
    lineKey: 'profit',
    title: 'Styled Chart',
    className: 'shadow-lg bg-slate-50',
    composedConfig: {
      className: 'h-96',
    },
  },
}
