import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Layout, PageHeader } from '@/components/layout'
import { TagDetails } from '@/components/tag'
import { route } from '@/shared'

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

export default Page
