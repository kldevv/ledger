import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PageHeader, Layout } from '@/components/layout'
import { TransactionDetails } from '@/components/transaction'
import { route } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('transaction')
  const { query } = useRouter()

  return (
    <Layout>
      <PageHeader
        action={{
          href: {
            pathname: route.transactionDetailEdit.pathname,
            query,
          },
          label: t`page.[id].index.action`,
        }}
      />
      <TransactionDetails />
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
      ])),
    },
  }
}

export default Page
