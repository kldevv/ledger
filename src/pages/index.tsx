import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core/presentationals'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { AccountBalanceTable } from '@/components/report'
import { route } from '@/shared/route'

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
