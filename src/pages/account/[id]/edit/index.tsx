import { UpdateAccountForm } from '@/components/account'
import { PageHeader, Layout } from '@/components/layout'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <UpdateAccountForm />
    </Layout>
  )
}

export default Page
