import { Layout, PageHeader } from '@/components/layout'
import { MonthlyAmountChangesAccountDataControllerTable } from '@/components/report'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <MonthlyAmountChangesAccountDataControllerTable />
    </Layout>
  )
}

export default Page
