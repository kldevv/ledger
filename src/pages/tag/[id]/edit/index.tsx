import { PageHeader, Layout } from '@/components/layout'
import { UpdateTagForm } from '@/components/tag/UpdateTagForm'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <UpdateTagForm />
    </Layout>
  )
}

export default Page
