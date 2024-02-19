import { useTranslation } from 'next-i18next'

import { PageHeader, Layout } from '@/components/layout'
import { TagDataTable } from '@/components/tag'
import { route } from '@/shared'

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

export default Page
