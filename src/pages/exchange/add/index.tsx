import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AddExchangeForm } from '@/components/exchange'
import { PageHeader, Layout } from '@/components/layout'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <AddExchangeForm />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'exchange',
        'layout',
        'route',
      ])),
    },
  }
}

export default Page
