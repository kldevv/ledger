import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout, PageHeader } from '@/components/layout'
import { AccountBalanceTable } from '@/components/report'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader hideDescription />
      <AccountBalanceTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'layout',
        'report',
        'route',
      ])),
    },
  }
}

export default Page
