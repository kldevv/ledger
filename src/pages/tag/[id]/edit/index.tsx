import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PageHeader, Layout } from '@/components/layout'
import { UpdateTagForm } from '@/components/tag/UpdateTagForm'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <UpdateTagForm />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'tag',
        'layout',
        'route',
      ])),
    },
  }
}

export default Page
