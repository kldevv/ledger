import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Layout, PageHeader } from '@/components/layout'
import { TagDetails } from '@/components/tag'
import { route, withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['tag']),
  }
}

export default Page
