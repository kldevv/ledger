import { Layout, PageHeader } from '@/components/layout'
import { AccountMonthlyAmountChangesDataControllerTable } from '@/components/report'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <h3 className="font-semibold text-dark-shades text-center">
        Account Monthly Report
      </h3>
      <AccountMonthlyAmountChangesDataControllerTable />
    </Layout>
  )
}

export default Page
