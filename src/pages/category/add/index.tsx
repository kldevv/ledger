import { AddCategoryFrom } from '@/components/category'
import { PageHeader, Layout } from '@/components/layout'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <AddCategoryFrom />
    </Layout>
  )
}

export default Page
