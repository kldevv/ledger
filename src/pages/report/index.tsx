import { Layout, PageHeader } from '@/components/layout'
import { AccountMonthlyAmountChangesDataControllerTable } from '@/components/report'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <AccountMonthlyAmountChangesDataControllerTable />
    </Layout>
  )
}

export default Page
