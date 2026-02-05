import type { Meta, StoryObj } from '@storybook/react'
import CustomPieChart from './custom-pie-chart'

const meta: Meta<typeof CustomPieChart> = {
  title: 'Charts/CustomPieChart',
  component: CustomPieChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

// Sample data sets
const productSalesData = [
  { product: 'Laptops', sales: 4500 },
  { product: 'Phones', sales: 3200 },
  { product: 'Tablets', sales: 2100 },
  { product: 'Accessories', sales: 1800 },
]

const marketShareData = [
  { company: 'Company A', share: 35 },
  { company: 'Company B', share: 28 },
  { company: 'Company C', share: 20 },
  { company: 'Company D', share: 12 },
  { company: 'Others', share: 5 },
]

const budgetData = [
  { category: 'Marketing', amount: 25000 },
  { category: 'Development', amount: 45000 },
  { category: 'Operations', amount: 18000 },
  { category: 'Sales', amount: 22000 },
  { category: 'HR', amount: 12000 },
]

const trafficSourcesData = [
  { source: 'Organic', visitors: 5600 },
  { source: 'Direct', visitors: 3200 },
  { source: 'Social', visitors: 2800 },
  { source: 'Referral', visitors: 1400 },
  { source: 'Email', visitors: 900 },
  { source: 'Paid', visitors: 1100 },
]

const twoItemsData = [
  { category: 'Active', value: 75 },
  { category: 'Inactive', value: 25 },
]

// Basic pie chart
export const BasicPie: StoryObj<
  typeof CustomPieChart<{
    product: string
    sales: number
  }>
> = {
  args: {
    chartData: productSalesData,
    dataKey: 'sales',
    nameKey: 'product',
    title: 'Product Sales Distribution',
  },
}

// With total label (donut chart)
export const WithTotalLabel: StoryObj<
  typeof CustomPieChart<{
    product: string
    sales: number
  }>
> = {
  args: {
    chartData: productSalesData,
    dataKey: 'sales',
    nameKey: 'product',
    title: 'Product Sales',
    totalLabel: 'Total Sales',
  },
}

// Market share
export const MarketShare: StoryObj<
  typeof CustomPieChart<{
    company: string
    share: number
  }>
> = {
  args: {
    chartData: marketShareData,
    dataKey: 'share',
    nameKey: 'company',
    title: 'Market Share (%)',
    totalLabel: 'Total %',
  },
}

// Budget allocation
export const BudgetAllocation: StoryObj<
  typeof CustomPieChart<{
    category: string
    amount: number
  }>
> = {
  args: {
    chartData: budgetData,
    dataKey: 'amount',
    nameKey: 'category',
    title: 'Budget Allocation',
    totalLabel: 'Total Budget',
  },
}

// Legend on right
export const LegendRight: StoryObj<
  typeof CustomPieChart<{
    source: string
    visitors: number
  }>
> = {
  args: {
    chartData: trafficSourcesData,
    dataKey: 'visitors',
    nameKey: 'source',
    title: 'Traffic Sources',
    totalLabel: 'Total Visitors',
    pieConfig: {
      legendPosition: 'right',
    },
  },
}

// Legend on bottom (default)
export const LegendBottom: StoryObj<
  typeof CustomPieChart<{
    source: string
    visitors: number
  }>
> = {
  args: {
    chartData: trafficSourcesData,
    dataKey: 'visitors',
    nameKey: 'source',
    title: 'Traffic Sources',
    totalLabel: 'Total Visitors',
    pieConfig: {
      legendPosition: 'bottom',
    },
  },
}

// Custom inner and outer radius (thick donut)
export const ThickDonut: StoryObj<
  typeof CustomPieChart<{
    category: string
    amount: number
  }>
> = {
  args: {
    chartData: budgetData,
    dataKey: 'amount',
    nameKey: 'category',
    title: 'Thick Donut Chart',
    totalLabel: 'Total',
    pieConfig: {
      innerRadius: 70,
      outerRadius: 100,
    },
  },
}

// Thin donut
export const ThinDonut: StoryObj<
  typeof CustomPieChart<{
    category: string
    amount: number
  }>
> = {
  args: {
    chartData: budgetData,
    dataKey: 'amount',
    nameKey: 'category',
    title: 'Thin Donut Chart',
    totalLabel: 'Total',
    pieConfig: {
      innerRadius: 80,
      outerRadius: 95,
    },
  },
}

// Semi-circle (half donut)
export const SemiCircle: StoryObj<
  typeof CustomPieChart<{
    product: string
    sales: number
  }>
> = {
  args: {
    chartData: productSalesData,
    dataKey: 'sales',
    nameKey: 'product',
    title: 'Semi-Circle Chart',
    pieConfig: {
      startAngle: 180,
      endAngle: 0,
      innerRadius: 60,
      outerRadius: 90,
    },
  },
}

// Three-quarter circle
export const ThreeQuarterCircle: StoryObj<
  typeof CustomPieChart<{
    company: string
    share: number
  }>
> = {
  args: {
    chartData: marketShareData,
    dataKey: 'share',
    nameKey: 'company',
    title: 'Three-Quarter Circle',
    totalLabel: 'Total',
    pieConfig: {
      startAngle: 90,
      endAngle: 450,
      innerRadius: 50,
      outerRadius: 80,
    },
  },
}

// With stroke
export const WithStroke: StoryObj<
  typeof CustomPieChart<{
    category: string
    value: number
  }>
> = {
  args: {
    chartData: twoItemsData,
    dataKey: 'value',
    nameKey: 'category',
    title: 'Chart with Stroke',
    totalLabel: 'Total %',
    pieConfig: {
      stroke: '#ffffff',
    },
  },
}

// No title
export const WithoutTitle: StoryObj<
  typeof CustomPieChart<{
    product: string
    sales: number
  }>
> = {
  args: {
    chartData: productSalesData,
    dataKey: 'sales',
    nameKey: 'product',
    totalLabel: 'Total',
  },
}

// Minimal data (two items)
export const MinimalData: StoryObj<
  typeof CustomPieChart<{
    category: string
    value: number
  }>
> = {
  args: {
    chartData: twoItemsData,
    dataKey: 'value',
    nameKey: 'category',
    title: 'Active vs Inactive',
    totalLabel: 'Total %',
  },
}

// Large dataset
export const LargeDataset: StoryObj<
  typeof CustomPieChart<{
    item: string
    value: number
  }>
> = {
  args: {
    chartData: Array.from({ length: 12 }, (_, i) => ({
      item: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 1000) + 500,
    })),
    dataKey: 'value',
    nameKey: 'item',
    title: 'Large Dataset (12 Items)',
    totalLabel: 'Total',
  },
}

// Custom className
export const CustomClassName: StoryObj<
  typeof CustomPieChart<{
    product: string
    sales: number
  }>
> = {
  args: {
    chartData: productSalesData,
    dataKey: 'sales',
    nameKey: 'product',
    title: 'Styled Pie Chart',
    totalLabel: 'Total',
    className: 'shadow-lg bg-slate-50',
    pieConfig: {
      className: 'max-w-md',
    },
  },
}

// Full circle (no inner radius)
export const FullCircle: StoryObj<
  typeof CustomPieChart<{
    category: string
    amount: number
  }>
> = {
  args: {
    chartData: budgetData,
    dataKey: 'amount',
    nameKey: 'category',
    title: 'Full Pie Chart',
    pieConfig: {
      innerRadius: 0,
      outerRadius: 100,
    },
  },
}

// Right legend with full circle
export const RightLegendFullCircle: StoryObj<
  typeof CustomPieChart<{
    category: string
    amount: number
  }>
> = {
  args: {
    chartData: budgetData,
    dataKey: 'amount',
    nameKey: 'category',
    title: 'Budget Overview',
    totalLabel: 'Total Budget',
    pieConfig: {
      innerRadius: 0,
      outerRadius: 80,
      legendPosition: 'right',
    },
  },
}
