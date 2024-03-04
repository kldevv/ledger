import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CategoryDetails } from '@/components/category'
import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('category')
  const { query } = useRouter()

  return (
    <Layout>
      <PageHeader
        action={{
          href: {
            pathname: route.categoryDetailEdit.pathname,
            query,
          },
          label: t`page.[id].index.action`,
        }}
      />
      <CategoryDetails />
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
