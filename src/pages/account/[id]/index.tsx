import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccountDetails } from '@/components/account'
import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('account')
  const { query } = useRouter()

  return (
    <Layout>
      <PageHeader
        action={{
          href: {
            pathname: route.accountDetailEdit.pathname,
            query,
          },
          label: t('page.[id].index.action'),
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
        'common',
        'account',
        'layout',
        'route',
      ])),
    },
  }
}

export default Page
