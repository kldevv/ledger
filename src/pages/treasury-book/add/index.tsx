import { PageHeader, Layout } from '@/components/layout'
import { InsertVaultForm } from '@/components/vault'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <InsertVaultForm />
    </Layout>
  )
}

export default Page
