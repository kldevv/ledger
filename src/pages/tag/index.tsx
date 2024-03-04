import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PageHeader, Layout } from '@/components/layout'
import { TagDataTable } from '@/components/tag'
import { route } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('tag')

  return (
    <Layout>
      <PageHeader
        action={{
          href: route.tagAdd.pathname,
          label: t`page.index.action`,
        }}
      />
      <TagDataTable />
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
