import * as apolloMocks from './mocks'

import type { ApolloMock, ApolloMocks } from '@/dev/apollo/types'

/**
 * Mock apollo queries and mutations
 */
export const mockApollo = (mocks: Partial<ApolloMocks>) => {
  return {
    apolloClient: {
      mocks: Object.entries(mocks).map(([key, args]) => {
        return buildMock({
          // eslint-disable-next-line import/namespace
          ...apolloMocks[key as keyof typeof apolloMocks],
          ...args,
        })
      }),
    },
  }
}

/**
 * Build mock shape
 */
const buildMock = ({ data, delay, error, variables, document }: ApolloMock) => {
  return {
    request: {
      query: document,
      variables,
    },
    result: {
      data,
    },
    delay,
    error,
  }
}
