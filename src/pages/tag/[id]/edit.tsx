import { PageHeader, Layout } from '@/components/layout'
import { UpdateTagForm } from '@/components/tag/UpdateTagForm'
import { withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <UpdateTagForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['tag']),
  }
}

export default Page
