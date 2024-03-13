import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AddExchangeForm } from '@/components/exchange'
import { Layout, Header } from '@/components/layout'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`xjournal.add.header`}
        section={t`xjournal.add.section`}
      />
      <AddExchangeForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'xjournal',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
