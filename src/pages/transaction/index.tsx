import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PageHeader, Layout } from '@/components/layout'
import { TransactionDataTable } from '@/components/transaction'
import { route } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('transaction')

  return (
    <Layout>
      <PageHeader
        action={{
          href: route.transactionAdd.pathname,
          label: t`page.index.action`,
        }}
      />
      <TransactionDataTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'transaction',
        'layout',
        'route',
      ])),
    },
  }
}

export default Page
