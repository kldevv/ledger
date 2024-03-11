import { EntryDataTable } from '@/components/entry'
import { PageHeader, Layout } from '@/components/layout'
import { withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <EntryDataTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['entry']),
  }
}

export default Page
