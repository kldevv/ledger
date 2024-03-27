import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PageTab } from '@/components/core'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { TotalDebitAndCreditOverTheMonthsTable } from '@/components/summary'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header header={t`summary.header`} section={t`summary.section`} />
      <PageTab
        options={[
          {
            label: 'Balance Over the Months',
            content: <TotalDebitAndCreditOverTheMonthsTable />,
          },
          {
            label: 'Total Credit / Debit on Months',
            content: 'TBA',
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
