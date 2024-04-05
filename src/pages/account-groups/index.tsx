import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccountGroupsTable } from '@/components/accountGroup/containers'
import { TextLink } from '@/components/core/presentationals'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { route } from '@/shared/route'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`accountGroup.header`}
        section={
          <Trans
            i18nKey={'pages:accountGroup.section'}
            components={{ account: <TextLink href={route.account.home} /> }}
          />
        }
        link={{ href: route.accountGroup.add, label: t`accountGroup.link` }}
      />
      <AccountGroupsTable />
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
