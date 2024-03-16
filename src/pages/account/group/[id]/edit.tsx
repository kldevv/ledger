import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { UpdateCategoryForm } from '@/components/category'
import { Layout, Header } from '@/components/layout'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`account.group.edit.header`}
        section={t`account.group.edit.section`}
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
