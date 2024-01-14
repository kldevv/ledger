import { useTranslation } from 'next-i18next'

import { PageHeader, Layout } from '@/components/layout'
import { TagDashboard } from '@/components/tag'
import { route } from '@/lib'

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
      <TagDashboard />
    </Layout>
  )
}

export default Page
