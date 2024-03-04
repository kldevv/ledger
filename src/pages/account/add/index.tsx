import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AddAccountFrom } from '@/components/account'
import { PageHeader, Layout } from '@/components/layout'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <AddAccountFrom />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'account',
        'layout',
        'route',
      ])),
    },
  }
}

export default Page
