import { GraphQLError } from 'graphql'

import { mockApollo } from '@/dev/apollo'

import { BranchSwitch } from './BranchSwitch'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof BranchSwitch> = {
  component: BranchSwitch,
}

export default meta

type Story = StoryObj<typeof BranchSwitch>

export const Default: Story = {
  parameters: {
    ...mockApollo({
      useBranchesQueryMock: {},
    }),
  },
}

export const Loading: Story = {
  parameters: {
    ...mockApollo({
      useBranchesQueryMock: {
        delay: Infinity,
      },
    }),
  },
}

export const Error: Story = {
  parameters: {
    ...mockApollo({
      useBranchesQueryMock: {
        error: new GraphQLError(''),
      },
    }),
  },
}
