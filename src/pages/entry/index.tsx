import { EntryDashboard } from '@/components/entry'
import { PageHeader, Layout } from '@/components/layout'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <EntryDashboard />
    </Layout>
  )
}

export default Page
