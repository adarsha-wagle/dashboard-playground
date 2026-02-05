import type { Meta, StoryObj } from '@storybook/react'
import SecondaryHeader from './secondary-header'

const meta: Meta<typeof SecondaryHeader> = {
  title: 'Components/SecondaryHeader',
  component: SecondaryHeader,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    className: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SecondaryHeader>

export const Default: Story = {
  args: {
    title: 'User Settings',
  },
}

export const WithDescription: Story = {
  args: {
    title: 'User Settings',
    description: 'Manage your profile preferences',
  },
}

export const LongDescription: Story = {
  args: {
    title: 'User Settings',
    description:
      'This description is quite long and is used to test how text wraps and aligns properly in different layouts.',
  },
}

export const CustomStyles: Story = {
  args: {
    title: 'Centered Header',
    description: 'This header is centered using custom className.',
    className: 'text-center',
  },
}
