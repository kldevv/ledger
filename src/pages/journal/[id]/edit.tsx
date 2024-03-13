import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout, Header } from '@/components/layout'
import { UpdateTransactionForm } from '@/components/transaction'

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
