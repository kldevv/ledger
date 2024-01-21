import { Layout, PageHeader } from '@/components/layout'
import { MonthlyBalanceTableGroup } from '@/components/report'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <MonthlyBalanceTableGroup />
    </Layout>
  )
}

export default Page
