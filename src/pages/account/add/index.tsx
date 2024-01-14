import { InsertAccountFrom } from '@/components/account'
import { PageHeader, Layout } from '@/components/layout'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <InsertAccountFrom />
    </Layout>
  )
}

export default Page
