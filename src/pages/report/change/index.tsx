import { Layout, PageHeader } from '@/components/layout'
import { MonthlyChangesTableGroup } from '@/components/report'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <MonthlyChangesTableGroup />
    </Layout>
  )
}

export default Page
