// import { EntryStatus } from '@/api/graphql'

// import { EntryStatusChip, FormattedDate } from '..'

import { DescriptionList } from './DescriptionList'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof DescriptionList> = {
  component: DescriptionList,
}

export default meta
type Story = StoryObj<typeof DescriptionList>

export const Primary: Story = {
  args: {
    items: [
      {
        title: 'Name',
        description: 'Random Name',
      },
    ],
    loading: false,
  },
}

export const Loading: Story = {
  args: { ...Primary.args, loading: true },
}

export const Empty: Story = {
  args: { items: [] },
}
