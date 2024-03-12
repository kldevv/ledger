import { useTranslation } from 'next-i18next'

import { UpdateCategoryForm } from '@/components/category'
import { Layout, Header } from '@/components/layout'
import { withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`accountGroup.edit.header`}
        section={t`accountGroup.edit.section`}
      />
      <UpdateCategoryForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['account']),
  }
}

export default Page
