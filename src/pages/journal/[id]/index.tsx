import { useTranslation } from 'next-i18next'

import { Layout, Header } from '@/components/layout'
import { TransactionDetails } from '@/components/transaction'
import { route, withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`journal.details.header`}
        section={t`journal.details.section`}
        link={{ label: t`journal.details.link`, href: route.journal.details }}
      />
      <TransactionDetails />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['journal']),
  }
}

export default Page
