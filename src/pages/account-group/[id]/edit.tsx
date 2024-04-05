import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { UpdateCategoryForm } from '@/components/category'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'

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
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'accountGroup',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
