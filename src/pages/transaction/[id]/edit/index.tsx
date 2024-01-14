import { PageHeader, Layout } from '@/components/layout'
import { UpdateTransactionForm } from '@/components/transaction'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <UpdateTransactionForm />
    </Layout>
  )
}

export default Page
