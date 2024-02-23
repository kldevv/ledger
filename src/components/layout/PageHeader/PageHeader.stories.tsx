import { PageHeader } from './PageHeader'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PageHeader> = {
  component: PageHeader,
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Primary: Story = {
  args: {
    action: {
      href: '/',
      label: 'ACTION',
    },
  },
}

export const NoDescription: Story = {
  args: {
    ...Primary.args,
    hideDescription: true,
  },
}

export const NoAction: Story = {}
