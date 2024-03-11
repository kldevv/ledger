import { PageHeader, Layout } from '@/components/layout'
import { UpdateTreasuryBookForm } from '@/components/treasuryBook'
import { withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <UpdateTreasuryBookForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['branch']),
  }
}
export default Page
