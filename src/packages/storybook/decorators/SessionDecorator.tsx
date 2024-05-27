import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { SessionMock } from '../../../dev/mocks'

import type { Decorator } from '@storybook/react'

export const SessionDecorator: Decorator = (Story, { parameters }) => {
  if (parameters.session !== false) {
    return (
      <SessionProvider session={SessionMock}>
        <Story />
      </SessionProvider>
    )
  }

  return <Story />
}
