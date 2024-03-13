import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CategoryDataTable } from '@/components/category'
import { Layout, Header } from '@/components/layout'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`account.group.header`}
        section={t`account.group.section`}
        link={{ href: route.accountGroup.add, label: t`account.group.link` }}
      />
      <CategoryDataTable />
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
