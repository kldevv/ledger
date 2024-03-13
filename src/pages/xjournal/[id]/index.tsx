import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ExchangeDetails } from '@/components/exchange'
import { Layout, Header } from '@/components/layout'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('exchange')
  const { query } = useRouter()

  return (
    <Layout>
      <Header
        header={t`xjournal.details.header`}
        section={t`xjournal.details.section`}
        link={{
          label: t`xjournal.details.link`,
          href: { pathname: route.xjournal.edit.pathname, query },
        }}
      />
      <ExchangeDetails />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
