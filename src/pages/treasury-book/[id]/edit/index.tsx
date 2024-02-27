import { PageHeader, Layout } from '@/components/layout'
import { UpdateTreasuryBookForm } from '@/components/treasuryBook'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <UpdateTreasuryBookForm />
    </Layout>
  )
}

export default Page
