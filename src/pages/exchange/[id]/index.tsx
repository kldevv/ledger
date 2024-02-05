import { ExchangeDetails } from '@/components/exchange'
import { PageHeader, Layout } from '@/components/layout'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <ExchangeDetails />
    </Layout>
  )
}

export default Page
