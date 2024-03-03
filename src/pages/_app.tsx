import { ApolloProvider } from '@apollo/client'
import { appWithTranslation } from 'next-i18next'
import { Toaster } from 'react-hot-toast'

import apolloClient from '@/api/graphql/client'
import { Notification } from '@/components/common'
import { PageHead } from '@/components/meta'
import { AccountsContextProvider, TreasuryBookContextProvider } from '@/hooks'

import '../../styles/globals.css'

import type { AppType } from 'next/app'

const App: AppType = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <TreasuryBookContextProvider>
        <AccountsContextProvider>
          <PageHead />
          <Component {...pageProps} />
          <Toaster>{(t) => <Notification {...t} />}</Toaster>
        </AccountsContextProvider>
      </TreasuryBookContextProvider>
    </ApolloProvider>
  )
}

export default appWithTranslation(App)
