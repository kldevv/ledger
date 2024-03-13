import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core'
import { Header, Layout } from '@/components/layout'
import { AccountBalanceTable } from '@/components/report'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`header`}
        section={
          <Trans
            i18nKey={'pages:section'}
            components={{ about: <TextLink href={route.core.about} /> }}
          />
        }
      />
      <AccountBalanceTable />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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
