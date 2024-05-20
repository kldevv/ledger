import { GraphQLError } from 'graphql'

import { useBranchesQueryMock } from '@/dev/apollo'

import { BranchSwitch } from './BranchSwitch'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof BranchSwitch> = {
  component: BranchSwitch,
}

export default meta

type Story = StoryObj<typeof BranchSwitch>

export const Default: Story = {
  parameters: {
    apolloClient: {
      mocks: [useBranchesQueryMock],
    },
  },
}

export const Loading: Story = {
  parameters: {
    apolloClient: {
      mocks: [{ ...useBranchesQueryMock, delay: 99999 }],
    },
  },
}

export const Error: Story = {
  parameters: {
    apolloClient: {
      mocks: [
        {
          ...useBranchesQueryMock,
          error: [new GraphQLError('Storybook mock error')],
        },
      ],
    },
  },
}
