import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccountDetails } from '@/components/account'
import { Layout, Header } from '@/components/layout'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('account')
  const { query } = useRouter()

  return (
    <Layout>
      <Header
        header={t`account.details.header`}
        section={t`account.details.section`}
        link={{
          href: { pathname: route.account.edit.pathname, query },
          label: t`account.details.link`,
        }}
      />
      <AccountDetails />
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
