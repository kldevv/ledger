import { PageHeader, Layout } from '@/components/layout'
import { AddTreasuryBookForm } from '@/components/treasuryBook'
import { withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <AddTreasuryBookForm />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['branch']),
  }
}

export default Page
