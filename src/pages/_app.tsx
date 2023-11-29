import type { AppType } from 'next/app';

import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

const App: AppType = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default appWithI18Next(App, ni18nConfig)
