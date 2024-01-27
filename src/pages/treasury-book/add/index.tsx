import { PageHeader, Layout } from '@/components/layout'
import { InsertTreasuryBookForm } from '@/components/treasuryBook'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <InsertTreasuryBookForm />
    </Layout>
  )
}

export default Page
