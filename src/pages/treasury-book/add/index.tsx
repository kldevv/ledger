import { PageHeader, Layout } from '@/components/layout'
import { AddTreasuryBookForm } from '@/components/treasuryBook'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <AddTreasuryBookForm />
    </Layout>
  )
}

export default Page
