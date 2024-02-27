import { PageHeader, Layout } from '@/components/layout'
import { AddTagForm } from '@/components/tag'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <AddTagForm />
    </Layout>
  )
}

export default Page
