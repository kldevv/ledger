import { useTranslation } from 'next-i18next'

import { AddCategoryFrom } from '@/components/category'
import { Layout, Header } from '@/components/layout'
import { withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`accountGroup.add.header`}
        section={t`accountGroup.add.section`}
      />
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
