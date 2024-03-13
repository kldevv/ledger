import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header, Layout } from '@/components/layout'
import { AccountBalanceTable } from '@/components/report'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header header={t`header`} section={t`section`} />
      <AccountBalanceTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'summary',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
