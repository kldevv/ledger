import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout, PageHeader } from '@/components/layout'
import { TagDetails } from '@/components/tag'
import { route } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('tag')
  const { query } = useRouter()

  return (
    <Layout>
      <PageHeader
        action={{
          href: {
            pathname: route.tagDetailEdit.pathname,
            query,
          },
          label: t`page.[id].index.action`,
        }}
      />
      <TagDetails />
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
