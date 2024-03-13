import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout, Header } from '@/components/layout'
import { AddTreasuryBookForm } from '@/components/treasuryBook'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header header={t`branch.add.header`} section={t`branch.add.section`} />
      <AddTreasuryBookForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'branch',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
