import { ApolloProvider } from '@apollo/client'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { Toaster } from 'react-hot-toast'

import apolloClient from '@/api/graphql/client'
import { CurrentBranchProvider } from '@/components/core/hooks'
import { Toast } from '@/components/core/presentationals'

import '../../styles/globals.css'

import type { AppType } from 'next/app'
import type { Session } from 'next-auth'

interface AppProps {
  session: Session
}

const App: AppType<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { t } = useTranslation('common')

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <CurrentBranchProvider>
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
          <Component {...pageProps} />
          <Toaster>{(t) => <Toast {...t} />}</Toaster>
        </CurrentBranchProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(App)
