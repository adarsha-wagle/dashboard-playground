import type { Meta, StoryObj } from '@storybook/react'
import { CustomScatterChart } from './custom-scatter-chart'

const meta: Meta<typeof CustomScatterChart> = {
  title: 'Charts/CustomScatterChart',
  component: CustomScatterChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

// Sample data sets
const heightWeightData = [
  { height: 160, weight: 65 },
  { height: 165, weight: 68 },
  { height: 170, weight: 72 },
  { height: 175, weight: 75 },
  { height: 180, weight: 80 },
  { height: 185, weight: 85 },
  { height: 190, weight: 90 },
]

const salesData = [
  { marketing: 1000, revenue: 15000 },
  { marketing: 1500, revenue: 18000 },
  { marketing: 2000, revenue: 22000 },
  { marketing: 2500, revenue: 28000 },
  { marketing: 3000, revenue: 32000 },
  { marketing: 3500, revenue: 38000 },
  { marketing: 4000, revenue: 45000 },
]

const temperatureData = [
  { temp: 15, sales: 45 },
  { temp: 18, sales: 52 },
  { temp: 22, sales: 68 },
  { temp: 25, sales: 85 },
  { temp: 28, sales: 95 },
  { temp: 30, sales: 110 },
  { temp: 32, sales: 125 },
  { temp: 35, sales: 140 },
]

const studyTimeGradesData = [
  { studyHours: 2, grade: 65 },
  { studyHours: 3, grade: 70 },
  { studyHours: 4, grade: 75 },
  { studyHours: 5, grade: 80 },
  { studyHours: 6, grade: 85 },
  { studyHours: 7, grade: 88 },
  { studyHours: 8, grade: 92 },
  { studyHours: 9, grade: 95 },
]

const productAData = [
  { price: 10, demand: 100 },
  { price: 15, demand: 85 },
  { price: 20, demand: 70 },
  { price: 25, demand: 55 },
  { price: 30, demand: 40 },
]

const productBData = [
  { price: 10, demand: 90 },
  { price: 15, demand: 80 },
  { price: 20, demand: 68 },
  { price: 25, demand: 58 },
  { price: 30, demand: 48 },
]

const productCData = [
  { price: 10, demand: 110 },
  { price: 15, demand: 95 },
  { price: 20, demand: 78 },
  { price: 25, demand: 60 },
  { price: 30, demand: 45 },
]

// Single scatter plot
export const SingleScatter: StoryObj<
  typeof CustomScatterChart<{
    height: number
    weight: number
  }>
> = {
  args: {
    chartData: heightWeightData,
    xKey: 'height',
    yKey: 'weight',
    title: 'Height vs Weight',
  },
}

// Marketing vs Revenue
export const MarketingVsRevenue: StoryObj<
  typeof CustomScatterChart<{
    marketing: number
    revenue: number
  }>
> = {
  args: {
    chartData: salesData,
    xKey: 'marketing',
    yKey: 'revenue',
    title: 'Marketing Spend vs Revenue',
  },
}

// Temperature vs Sales
export const TemperatureVsSales: StoryObj<
  typeof CustomScatterChart<{
    temp: number
    sales: number
  }>
> = {
  args: {
    chartData: temperatureData,
    xKey: 'temp',
    yKey: 'sales',
    title: 'Temperature vs Ice Cream Sales',
  },
}

// Study time vs grades
export const StudyTimeVsGrades: StoryObj<
  typeof CustomScatterChart<{
    studyHours: number
    grade: number
  }>
> = {
  args: {
    chartData: studyTimeGradesData,
    xKey: 'studyHours',
    yKey: 'grade',
    title: 'Study Hours vs Test Grades',
  },
}

// Multiple series (Product comparison)
export const MultipleSeries: StoryObj<
  typeof CustomScatterChart<{
    price: number
    demand: number
  }>
> = {
  args: {
    series: [
      {
        data: productAData,
        xKey: 'price',
        yKey: 'demand',
        name: 'Product A',
      },
      {
        data: productBData,
        xKey: 'price',
        yKey: 'demand',
        name: 'Product B',
      },
      {
        data: productCData,
        xKey: 'price',
        yKey: 'demand',
        name: 'Product C',
      },
    ],
    title: 'Price vs Demand (Multiple Products)',
  },
}

// Two series comparison
export const TwoSeriesComparison: StoryObj<
  typeof CustomScatterChart<{
    price: number
    demand: number
  }>
> = {
  args: {
    series: [
      {
        data: productAData,
        xKey: 'price',
        yKey: 'demand',
        name: 'Product A',
      },
      {
        data: productBData,
        xKey: 'price',
        yKey: 'demand',
        name: 'Product B',
      },
    ],
    title: 'Product A vs Product B',
  },
}

// No title
export const WithoutTitle: StoryObj<
  typeof CustomScatterChart<{
    height: number
    weight: number
  }>
> = {
  args: {
    chartData: heightWeightData,
    xKey: 'height',
    yKey: 'weight',
  },
}

// Large dataset
export const LargeDataset: StoryObj<
  typeof CustomScatterChart<{
    x: number
    y: number
  }>
> = {
  args: {
    chartData: Array.from({ length: 100 }, () => ({
      x: Math.floor(Math.random() * 100) + 1,
      y: Math.floor(Math.random() * 100) + 1,
    })),
    xKey: 'x',
    yKey: 'y',
    title: 'Random Data Points (100 points)',
  },
}

// Clustered data
export const ClusteredData: StoryObj<
  typeof CustomScatterChart<{
    x: number
    y: number
  }>
> = {
  args: {
    chartData: [
      // Cluster 1
      ...Array.from({ length: 15 }, () => ({
        x: Math.floor(Math.random() * 20) + 10,
        y: Math.floor(Math.random() * 20) + 10,
      })),
      // Cluster 2
      ...Array.from({ length: 15 }, () => ({
        x: Math.floor(Math.random() * 20) + 60,
        y: Math.floor(Math.random() * 20) + 60,
      })),
    ],
    xKey: 'x',
    yKey: 'y',
    title: 'Clustered Data Points',
  },
}

// Minimal data
export const MinimalData: StoryObj<
  typeof CustomScatterChart<{
    x: number
    y: number
  }>
> = {
  args: {
    chartData: [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
      { x: 50, y: 60 },
    ],
    xKey: 'x',
    yKey: 'y',
    title: 'Three Data Points',
  },
}

// Custom className
export const CustomClassName: StoryObj<
  typeof CustomScatterChart<{
    height: number
    weight: number
  }>
> = {
  args: {
    chartData: heightWeightData,
    xKey: 'height',
    yKey: 'weight',
    title: 'Styled Scatter Chart',
    className: 'shadow-lg bg-slate-50',
    scatterConfig: {
      className: 'h-96',
    },
  },
}

// Correlation analysis
export const PositiveCorrelation: StoryObj<
  typeof CustomScatterChart<{
    experience: number
    salary: number
  }>
> = {
  args: {
    chartData: Array.from({ length: 20 }, (_, i) => ({
      experience: i + 1,
      salary: 30000 + i * 3000 + Math.random() * 5000,
    })),
    xKey: 'experience',
    yKey: 'salary',
    title: 'Years of Experience vs Salary',
  },
}

// Negative correlation
export const NegativeCorrelation: StoryObj<
  typeof CustomScatterChart<{
    age: number
    energy: number
  }>
> = {
  args: {
    chartData: Array.from({ length: 20 }, (_, i) => ({
      age: 20 + i * 2,
      energy: 100 - i * 3 + Math.random() * 10,
    })),
    xKey: 'age',
    yKey: 'energy',
    title: 'Age vs Energy Level',
  },
}

// Multiple series with different data sizes
export const DifferentSeriesSizes: StoryObj<
  typeof CustomScatterChart<{
    x: number
    y: number
  }>
> = {
  args: {
    series: [
      {
        data: Array.from({ length: 30 }, () => ({
          x: Math.floor(Math.random() * 50) + 1,
          y: Math.floor(Math.random() * 50) + 1,
        })),
        xKey: 'x',
        yKey: 'y',
        name: 'Dataset 1 (30 points)',
      },
      {
        data: Array.from({ length: 20 }, () => ({
          x: Math.floor(Math.random() * 50) + 50,
          y: Math.floor(Math.random() * 50) + 50,
        })),
        xKey: 'x',
        yKey: 'y',
        name: 'Dataset 2 (20 points)',
      },
      {
        data: Array.from({ length: 15 }, () => ({
          x: Math.floor(Math.random() * 30) + 20,
          y: Math.floor(Math.random() * 30) + 70,
        })),
        xKey: 'x',
        yKey: 'y',
        name: 'Dataset 3 (15 points)',
      },
    ],
    title: 'Multiple Series with Different Sizes',
  },
}

// Four series
export const FourSeries: StoryObj<
  typeof CustomScatterChart<{
    value1: number
    value2: number
  }>
> = {
  args: {
    series: [
      {
        data: Array.from({ length: 10 }, () => ({
          value1: Math.random() * 25,
          value2: Math.random() * 25,
        })),
        xKey: 'value1',
        yKey: 'value2',
        name: 'Q1',
      },
      {
        data: Array.from({ length: 10 }, () => ({
          value1: Math.random() * 25 + 25,
          value2: Math.random() * 25,
        })),
        xKey: 'value1',
        yKey: 'value2',
        name: 'Q2',
      },
      {
        data: Array.from({ length: 10 }, () => ({
          value1: Math.random() * 25,
          value2: Math.random() * 25 + 25,
        })),
        xKey: 'value1',
        yKey: 'value2',
        name: 'Q3',
      },
      {
        data: Array.from({ length: 10 }, () => ({
          value1: Math.random() * 25 + 25,
          value2: Math.random() * 25 + 25,
        })),
        xKey: 'value1',
        yKey: 'value2',
        name: 'Q4',
      },
    ],
    title: 'Four Quadrants Comparison',
  },
}
