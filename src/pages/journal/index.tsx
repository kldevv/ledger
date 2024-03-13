import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout, Header } from '@/components/layout'
import { TransactionDataTable } from '@/components/transaction'
import { route } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`journal.header`}
        section={t`journal.section`}
        link={{ label: t`journal.link`, href: route.journal.add }}
      />
      <TransactionDataTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'journal',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
