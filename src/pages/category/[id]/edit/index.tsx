import { UpdateCategoryForm } from '@/components/category'
import { PageHeader, Layout } from '@/components/layout'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <UpdateCategoryForm />
    </Layout>
  )
}

export default Page
