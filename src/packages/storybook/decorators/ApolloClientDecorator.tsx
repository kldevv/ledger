import { InMemoryCache } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'

import type { MockedResponse } from '@apollo/client/testing'
import type { Decorator } from '@storybook/react'

export const ApolloClientDecorator: Decorator = (Story, { parameters }) => {
  if (parameters.apolloClient?.mocks != null) {
    return (
      <MockedProvider
        cache={new InMemoryCache()}
        mocks={parameters.apolloClient.mocks}
        addTypename
      >
        <Story />
      </MockedProvider>
    )
  }

  return <Story />
}

declare module '@storybook/types' {
  interface Parameters {
    apolloClient?: {
      mocks: MockedResponse<Record<string, unknown>, Record<string, unknown>>[]
    }
  }
}
