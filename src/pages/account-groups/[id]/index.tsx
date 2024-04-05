import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccountGroupDetails } from '@/components/accountGroup/containers'
import { TextLink } from '@/components/core/presentationals'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { route } from '@/shared/route'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')
  const { query } = useRouter()

  return (
    <Layout>
      <Header
        header={t`accountGroup.details.header`}
        section={
          <Trans
            i18nKey={'pages:accountGroup.details.section'}
            components={{ account: <TextLink href={route.account.home} /> }}
          />
        }
        link={{
          href: { pathname: route.accountGroup.edit.pathname, query },
          label: t`accountGroup.details.link`,
        }}
      />
      <AccountGroupDetails />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'account',
        'journal',
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
