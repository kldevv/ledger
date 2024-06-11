import { Button } from '@/packages/core/components'

import { PageHeader } from './PageHeader'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PageHeader> = {
  component: PageHeader,
}

export default meta

type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: {
    header: 'Header',
    desc: 'Description',
  },
}

export const HasChildren: Story = {
  args: {
    header: 'Header',
    desc: 'Description',
    children: (
      <div className="flex items-center gap-x-1">
        <Button variant="secondary">Button Secondary</Button>
        <Button variant="primary">Button Primary</Button>
      </div>
    ),
  },
}
