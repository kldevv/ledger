import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ExchangeDetails } from '@/components/exchange'
import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('exchange')
  const { query } = useRouter()

  return (
    <Layout>
      <PageHeader
        action={{
          href: { pathname: route.exchangeDetailsEdit.pathname, query },
          label: t`page.[id].index.action`,
        }}
      />
      <ExchangeDetails />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'exchange',
        'layout',
        'route',
      ])),
    },
  }
}

export default Page
