import { PageHeader, Layout } from '@/components/layout'
import { InsertTransactionForm } from '@/components/transaction'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <InsertTransactionForm />
    </Layout>
  )
}

export default Page
