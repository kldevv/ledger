import { useTranslation } from 'next-i18next'

import { CategoryDashboard } from '@/components/category'
import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/lib'

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
      <CategoryDashboard />
    </Layout>
  )
}

export default Page
