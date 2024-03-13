import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccountDataTable } from '@/components/account'
import { Layout, Header } from '@/components/layout'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`account.header`}
        section={t`account.section`}
        link={{ href: route.account.add, label: t`account.link` }}
      />
      <AccountDataTable />
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
