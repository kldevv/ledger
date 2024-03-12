import { useTranslation } from 'next-i18next'

import { CategoryDataTable } from '@/components/category'
import { Layout, Header } from '@/components/layout'
import { route, withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`accountGroup.header`}
        section={t`accountGroup.section`}
        link={{ href: route.accountGroup.add, label: t`accountGroup.link` }}
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
