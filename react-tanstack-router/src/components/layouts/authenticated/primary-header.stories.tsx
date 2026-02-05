import type { Meta, StoryObj } from '@storybook/react'
import PrimaryHeader from './primary-header'

const meta: Meta<typeof PrimaryHeader> = {
  title: 'Components/PrimaryHeader',
  component: PrimaryHeader,
}
export default meta

type Story = StoryObj<typeof PrimaryHeader>

export const Default: Story = {
  args: {
    title: 'Dashboard',
  },
}

export const WithDescription: Story = {
  args: {
    title: 'Dashboard',
    description: 'Overview of your recent activity',
  },
}

export const LongText: Story = {
  args: {
    title: 'This is a much longer title meant for layout testing',
    description:
      'This description is intentionally long to preview wrapping and layout behavior.',
  },
}

export const CustomStyles: Story = {
  args: {
    title: 'Centered Header',
    description: 'This header is centered via className',
    className: 'text-center',
  },
}
