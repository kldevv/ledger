import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CategoryDetails } from '@/components/category'
import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/shared'

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

export default Page
