import { useTranslation } from 'next-i18next'

import { Layout, Header } from '@/components/layout'
import { AddTransactionForm } from '@/components/transaction'
import { withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header header={t`journal.add.header`} section={t`journal.add.section`} />
      <AddTransactionForm />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['journal']),
  }
}

export default Page
