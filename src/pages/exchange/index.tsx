import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ExchangeDataTable } from '@/components/exchange'
import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('exchange')

  return (
    <Layout>
      <PageHeader
        action={{
          href: route.exchangeAdd.pathname,
          label: t`page.index.action`,
        }}
      />
      <ExchangeDataTable />
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
