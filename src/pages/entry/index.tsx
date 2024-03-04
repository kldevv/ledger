import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { EntryDataTable } from '@/components/entry'
import { PageHeader, Layout } from '@/components/layout'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <EntryDataTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'entry',
        'layout',
        'route',
      ])),
    },
  }
}

export default Page
