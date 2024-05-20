import { AddLinkDocument, LinksDocument } from '@/api/graphql'
import { UserIdMock } from '@/dev/mocks'

import { AddLinkForm } from './AddLinkForm'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AddLinkForm> = {
  component: AddLinkForm,
}

export default meta
type Story = StoryObj<typeof AddLinkForm>

export const Default: Story = {
  parameters: {
    session: true,
    apolloClient: {
      mocks: [
        {
          request: {
            query: AddLinkDocument,
            variables: {
              input: {
                name: '12345',
                type: 'FX',
                userId: UserIdMock,
              },
            },
          },
          result: {
            data: { addLink: { name: '123' } },
          },
        },
        {
          request: {
            query: LinksDocument,
            variables: {
              input: {
                userId: UserIdMock,
              },
            },
          },
          result: {
            data: [{ name: '123' }],
          },
        },
      ],
    },
  },
}
