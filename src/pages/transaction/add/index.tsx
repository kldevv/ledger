import { PageHeader, Layout } from '@/components/layout'
import { AddTransactionForm } from '@/components/transaction'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <AddTransactionForm />
    </Layout>
  )
}

export default Page
