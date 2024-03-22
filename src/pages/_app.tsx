import { ApolloProvider } from '@apollo/client'
import Head from 'next/head'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { Toaster } from 'react-hot-toast'

import apolloClient from '@/api/graphql/client'
import { Notification } from '@/components/core'
import { CurrentBranchProvider } from '@/components/core/hooks'
import { AccountsContextProvider } from '@/hooks'

import '../../styles/globals.css'

import type { AppType } from 'next/app'

const App: AppType = ({ Component, pageProps }) => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title key="title">{t`meta.title`}</title>
        <meta key="og:title" content={t`meta.title`} property="og.title" />
        <meta key="description" content={t`meta.desc`} name="description" />
        <meta
          key="og:description"
          content={t`meta.desc`}
          property="og:description"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <CurrentBranchProvider>
          <AccountsContextProvider>
            <Component {...pageProps} />
            <Toaster>{(t) => <Notification {...t} />}</Toaster>
          </AccountsContextProvider>
        </CurrentBranchProvider>
      </ApolloProvider>
    </>
  )
}

export default appWithTranslation(App)
