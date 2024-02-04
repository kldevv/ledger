import { InsertExchangeForm } from '@/components/exchange'
import { PageHeader, Layout } from '@/components/layout'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <InsertExchangeForm />
    </Layout>
  )
}

export default Page
