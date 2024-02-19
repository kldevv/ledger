import { useTranslation } from 'next-i18next'

import { CategoryDataTable } from '@/components/category'
import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/shared'

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

export default Page
