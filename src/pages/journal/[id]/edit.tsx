import { useTranslation } from 'next-i18next'

import { Layout, Header } from '@/components/layout'
import { UpdateTransactionForm } from '@/components/transaction'
import { withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`journal.details.edit.header`}
        section={t`journal.details.edit.section`}
      />
      <UpdateTransactionForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['journal']),
  }
}

export default Page
