import { useTranslation } from 'next-i18next'

import { CategoryDataTable } from '@/components/category'
import { PageHeader, Layout } from '@/components/layout'
import { route, withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('accountGroup')

  return (
    <Layout>
      <PageHeader
        action={{
          href: route.categoryAdd,
          label: t`page.index.action`,
        }}
      />
      <CategoryDataTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['accountGroup']),
  }
}

export default Page
