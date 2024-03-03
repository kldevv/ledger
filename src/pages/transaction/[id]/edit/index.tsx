import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PageHeader, Layout } from '@/components/layout'
import { UpdateTransactionForm } from '@/components/transaction'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <UpdateTransactionForm />
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
