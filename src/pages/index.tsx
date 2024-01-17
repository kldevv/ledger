import { Icon } from '@/components/common/Icon/Icon'
import { Layout, PageHeader } from '@/components/layout'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader hideDescription />
      <Icon />
    </Layout>
  )
}

export default Page
