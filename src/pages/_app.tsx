import { ApolloProvider } from '@apollo/client'
import { appWithI18Next } from 'ni18n'
import { Toaster } from 'react-hot-toast'

import apolloClient from '@/api/graphql/client'
import { PageHead } from '@/components/meta'
import { TreasuryBookContextProvider } from '@/hooks'

import { ni18nConfig } from '../../ni18n.config'
import '../../styles/globals.css'

import type { AppType } from 'next/app'

const App: AppType = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <TreasuryBookContextProvider>
        <PageHead />
        <Component {...pageProps} />
        <Toaster />
      </TreasuryBookContextProvider>
    </ApolloProvider>
  )
}

export default appWithI18Next(App, ni18nConfig)
