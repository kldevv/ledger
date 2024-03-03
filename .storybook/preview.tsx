import '../styles/globals.css'

import React from 'react'

import type { Preview } from '@storybook/react'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client'
import { withScalars } from 'apollo-link-scalars'
import { IntrospectionQuery, buildClientSchema } from 'graphql'
import { DateTimeResolver } from 'graphql-scalars'
import { initialize, mswLoader } from 'msw-storybook-addon'

import introspection from '../src/api/graphql/__generated__/introspection.json'

// Initialize MSW
initialize()

const mockApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    withScalars({
      schema: buildClientSchema(introspection as unknown as IntrospectionQuery),
      typesMap: {
        // Deserialize data to JS date
        DateTime: DateTimeResolver,
      },
    }),
    new HttpLink({ uri: 'http://localhost:6006/' }),
  ]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <ApolloProvider client={mockApolloClient}>
        <div className="leading-6">
          <Story />
        </div>
      </ApolloProvider>
    ),
  ],
}

export default preview
