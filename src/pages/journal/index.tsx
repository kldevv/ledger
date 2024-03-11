import { useTranslation } from 'next-i18next'

import { Layout, Header } from '@/components/layout'
import { TransactionDataTable } from '@/components/transaction'
import { route, withTranslations } from '@/shared'

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
    props: await withTranslations(locale, ['journal']),
  }
}

export default Page
