import { Layout, PageHeader } from '@/components/layout'
import { ReportDashboard } from '@/components/report'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <ReportDashboard />
    </Layout>
  )
}

export default Page
