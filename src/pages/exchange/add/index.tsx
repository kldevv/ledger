import { PageHeader, Layout } from '@/components/layout'
import { TagDashboard } from '@/components/tag'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <TagDashboard />
    </Layout>
  )
}

export default Page
