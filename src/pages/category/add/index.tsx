import { InsertCategoryFrom } from '@/components/category'
import { PageHeader, Layout } from '@/components/layout'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <InsertCategoryFrom />
    </Layout>
  )
}

export default Page
