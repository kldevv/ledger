import { EntryDataTable } from '@/components/entry'
import { PageHeader, Layout } from '@/components/layout'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <EntryDataTable />
    </Layout>
  )
}

export default Page
