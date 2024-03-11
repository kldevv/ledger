import { AddCategoryFrom } from '@/components/category'
import { PageHeader, Layout } from '@/components/layout'
import { withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <AddCategoryFrom />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['accountGroup']),
  }
}

export default Page
