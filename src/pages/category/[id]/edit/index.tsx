import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { UpdateCategoryForm } from '@/components/category'
import { PageHeader, Layout } from '@/components/layout'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <UpdateCategoryForm />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'category',
        'layout',
        'route',
      ])),
    },
  }
}

export default Page
