import '@/../styles/globals.css';

import type { AppType } from 'next/app';
import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';

import { ApolloProvider } from '@apollo/client';

import apolloClient from '@/api/graphql/client';
import { WalletContextProvider } from '@/hooks';

const App: AppType = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </ApolloProvider>
  );
};

export default appWithI18Next(App, ni18nConfig)
