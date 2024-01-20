import { Layout, PageHeader } from '@/components/layout'
import { MonthlyAmountChangesTableGroup } from '@/components/report'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <MonthlyAmountChangesTableGroup />
    </Layout>
  )
}

export default Page
