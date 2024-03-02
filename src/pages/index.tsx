import { Layout, PageHeader } from '@/components/layout'
import { AccountBalanceTable } from '@/components/report'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader hideDescription />
      <AccountBalanceTable />
    </Layout>
  )
}

export default Page
