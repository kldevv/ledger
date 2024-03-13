import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ExchangeDataTable } from '@/components/exchange'
import { Layout, Header } from '@/components/layout'
import { route } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`xjournal.header`}
        section={t`xjournal.section`}
        link={{ label: t`xjournal.link`, href: route.xjournal.add }}
      />
      <ExchangeDataTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'xjournal',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
