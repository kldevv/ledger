import { PageHeader, Layout } from '@/components/layout'
import { InsertTagForm } from '@/components/tag'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <InsertTagForm />
    </Layout>
  )
}

export default Page
