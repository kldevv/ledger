import { AddExchangeForm } from '@/components/exchange'
import { PageHeader, Layout } from '@/components/layout'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <AddExchangeForm />
    </Layout>
  )
}

export default Page
