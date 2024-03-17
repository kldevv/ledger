import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header, Layout } from '@/components/layout'

import type { GetServerSideProps } from 'next'
import { PageTab } from '@/components/core'
import {
  MonthlyBalanceTableGroup,
  MonthlyChangesTableGroup,
} from '@/components/report'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header header={t`summary.header`} section={t`summary.section`} />
      <PageTab
        options={[
          {
            label: 'Balance Over the Months',
            content: <MonthlyBalanceTableGroup />,
          },
          {
            label: 'Total Credit / Debit on Months',
            content: <MonthlyChangesTableGroup />,
          },
        ]}
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'summary',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
