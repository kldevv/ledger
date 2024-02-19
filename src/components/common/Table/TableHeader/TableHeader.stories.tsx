import { TableHeader } from './TableHeader'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TableHeader> = {
  component: TableHeader,
}

export default meta
type Story = StoryObj<typeof TableHeader>

export const Primary: Story = {
  args: {
    children: 'Table Header',
  },
}
