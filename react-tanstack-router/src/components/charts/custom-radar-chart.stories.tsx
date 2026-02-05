import type { Meta, StoryObj } from '@storybook/react'
import { CustomRadarChart } from './custom-radar-chart'

const meta: Meta<typeof CustomRadarChart> = {
  title: 'Charts/CustomRadarChart',
  component: CustomRadarChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

// Sample data sets
const skillsData = [
  { skill: 'Communication', score: 85 },
  { skill: 'Problem Solving', score: 90 },
  { skill: 'Teamwork', score: 75 },
  { skill: 'Leadership', score: 80 },
  { skill: 'Technical', score: 95 },
  { skill: 'Creativity', score: 70 },
]

const productComparisonData = [
  { feature: 'Performance', productA: 85, productB: 70, productC: 90 },
  { feature: 'Reliability', productA: 90, productB: 85, productC: 80 },
  { feature: 'Price', productA: 60, productB: 80, productC: 70 },
  { feature: 'Features', productA: 95, productB: 75, productC: 85 },
  { feature: 'Support', productA: 80, productB: 90, productC: 75 },
  { feature: 'Ease of Use', productA: 85, productB: 95, productC: 80 },
]

const employeePerformanceData = [
  { category: 'Productivity', current: 78, target: 85 },
  { category: 'Quality', current: 88, target: 90 },
  { category: 'Collaboration', current: 92, target: 85 },
  { category: 'Innovation', current: 65, target: 75 },
  { category: 'Punctuality', current: 95, target: 90 },
]

const marketAnalysisData = [
  { segment: 'Market Share', value: 45 },
  { segment: 'Brand Recognition', value: 78 },
  { segment: 'Customer Satisfaction', value: 85 },
  { segment: 'Product Quality', value: 92 },
  { segment: 'Innovation', value: 68 },
  { segment: 'Customer Service', value: 80 },
  { segment: 'Value for Money', value: 75 },
]

const twoMetricsData = [
  { metric: 'Speed', value: 85 },
  { metric: 'Accuracy', value: 90 },
  { metric: 'Efficiency', value: 78 },
]

// Single data series
export const SingleDataSeries: StoryObj<
  typeof CustomRadarChart<{
    skill: string
    score: number
  }>
> = {
  args: {
    chartData: skillsData,
    angleKey: 'skill',
    dataKey: 'score',
    title: 'Employee Skills Assessment',
  },
}

// Multiple data series (Product Comparison)
export const MultipleDataSeries: StoryObj<
  typeof CustomRadarChart<{
    feature: string
    productA: number
    productB: number
    productC: number
  }>
> = {
  args: {
    chartData: productComparisonData,
    angleKey: 'feature',
    dataKey: ['productA', 'productB', 'productC'],
    title: 'Product Feature Comparison',
  },
}

// Two data series (Current vs Target)
export const CurrentVsTarget: StoryObj<
  typeof CustomRadarChart<{
    category: string
    current: number
    target: number
  }>
> = {
  args: {
    chartData: employeePerformanceData,
    angleKey: 'category',
    dataKey: ['current', 'target'],
    title: 'Performance: Current vs Target',
  },
}

// Market analysis
export const MarketAnalysis: StoryObj<
  typeof CustomRadarChart<{
    segment: string
    value: number
  }>
> = {
  args: {
    chartData: marketAnalysisData,
    angleKey: 'segment',
    dataKey: 'value',
    title: 'Market Position Analysis',
  },
}

// High fill opacity
export const HighFillOpacity: StoryObj<
  typeof CustomRadarChart<{
    skill: string
    score: number
  }>
> = {
  args: {
    chartData: skillsData,
    angleKey: 'skill',
    dataKey: 'score',
    title: 'Skills (High Opacity)',
    radarConfig: {
      fillOpacity: 0.6,
    },
  },
}

// Low fill opacity
export const LowFillOpacity: StoryObj<
  typeof CustomRadarChart<{
    skill: string
    score: number
  }>
> = {
  args: {
    chartData: skillsData,
    angleKey: 'skill',
    dataKey: 'score',
    title: 'Skills (Low Opacity)',
    radarConfig: {
      fillOpacity: 0.1,
    },
  },
}

// No dots
export const WithoutDots: StoryObj<
  typeof CustomRadarChart<{
    feature: string
    productA: number
    productB: number
  }>
> = {
  args: {
    chartData: productComparisonData,
    angleKey: 'feature',
    dataKey: ['productA', 'productB'],
    title: 'Product Comparison (No Dots)',
    radarConfig: {
      dot: false,
    },
  },
}

// Thick stroke
export const ThickStroke: StoryObj<
  typeof CustomRadarChart<{
    category: string
    current: number
    target: number
  }>
> = {
  args: {
    chartData: employeePerformanceData,
    angleKey: 'category',
    dataKey: ['current', 'target'],
    title: 'Performance (Thick Lines)',
    radarConfig: {
      strokeWidth: 4,
      dot: true,
    },
  },
}

// Thin stroke
export const ThinStroke: StoryObj<
  typeof CustomRadarChart<{
    skill: string
    score: number
  }>
> = {
  args: {
    chartData: skillsData,
    angleKey: 'skill',
    dataKey: 'score',
    title: 'Skills (Thin Lines)',
    radarConfig: {
      strokeWidth: 1,
    },
  },
}

// Combined styling
export const CombinedStyling: StoryObj<
  typeof CustomRadarChart<{
    feature: string
    productA: number
    productB: number
    productC: number
  }>
> = {
  args: {
    chartData: productComparisonData,
    angleKey: 'feature',
    dataKey: ['productA', 'productB', 'productC'],
    title: 'Custom Styled Radar',
    radarConfig: {
      fillOpacity: 0.5,
      strokeWidth: 3,
      dot: true,
    },
  },
}

// No title
export const WithoutTitle: StoryObj<
  typeof CustomRadarChart<{
    skill: string
    score: number
  }>
> = {
  args: {
    chartData: skillsData,
    angleKey: 'skill',
    dataKey: 'score',
  },
}

// Minimal data
export const MinimalData: StoryObj<
  typeof CustomRadarChart<{
    metric: string
    value: number
  }>
> = {
  args: {
    chartData: twoMetricsData,
    angleKey: 'metric',
    dataKey: 'value',
    title: 'Three Metrics',
  },
}

// Large dataset
export const LargeDataset: StoryObj<
  typeof CustomRadarChart<{
    dimension: string
    score: number
  }>
> = {
  args: {
    chartData: Array.from({ length: 10 }, (_, i) => ({
      dimension: `Dimension ${i + 1}`,
      score: Math.floor(Math.random() * 40) + 60,
    })),
    angleKey: 'dimension',
    dataKey: 'score',
    title: '10 Dimensions Assessment',
  },
}

// Custom className
export const CustomClassName: StoryObj<
  typeof CustomRadarChart<{
    skill: string
    score: number
  }>
> = {
  args: {
    chartData: skillsData,
    angleKey: 'skill',
    dataKey: 'score',
    title: 'Styled Radar Chart',
    className: 'shadow-lg bg-slate-50',
    radarConfig: {
      className: 'h-96',
    },
  },
}

// Four data series
export const FourDataSeries: StoryObj<
  typeof CustomRadarChart<{
    aspect: string
    q1: number
    q2: number
    q3: number
    q4: number
  }>
> = {
  args: {
    chartData: [
      { aspect: 'Sales', q1: 85, q2: 90, q3: 78, q4: 95 },
      { aspect: 'Marketing', q1: 70, q2: 75, q3: 80, q4: 85 },
      { aspect: 'Support', q1: 88, q2: 85, q3: 90, q4: 92 },
      { aspect: 'Development', q1: 75, q2: 80, q3: 85, q4: 88 },
      { aspect: 'Operations', q1: 82, q2: 78, q3: 80, q4: 85 },
    ],
    angleKey: 'aspect',
    dataKey: ['q1', 'q2', 'q3', 'q4'],
    title: 'Quarterly Department Performance',
  },
}

// Subtle styling for presentation
export const PresentationStyle: StoryObj<
  typeof CustomRadarChart<{
    category: string
    current: number
    target: number
  }>
> = {
  args: {
    chartData: employeePerformanceData,
    angleKey: 'category',
    dataKey: ['current', 'target'],
    title: 'Performance Overview',
    radarConfig: {
      fillOpacity: 0.2,
      strokeWidth: 2,
      dot: false,
    },
  },
}
