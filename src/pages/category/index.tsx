import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CategoryDataTable } from '@/components/category'
import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('category')

  return (
    <Layout>
      <PageHeader
        action={{
          href: route.categoryAdd,
          label: t`page.index.action`,
        }}
      />
      <CategoryDataTable />
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
