import { TableCell } from './TableCell'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TableCell> = {
  component: TableCell,
}

export default meta
type Story = StoryObj<typeof TableCell>

export const WhiteBackground: Story = {
  args: { children: 'Any Text' },
}

export const GrayBackground: Story = {
  args: { children: 'Any Text', variant: 'gray' },
}
