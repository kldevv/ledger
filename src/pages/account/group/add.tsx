import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AddCategoryFrom } from '@/components/category'
import { Layout, Header } from '@/components/layout'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`account.group.add.header`}
        section={t`account.group.add.section`}
      />
      <AddCategoryFrom />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'account',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
