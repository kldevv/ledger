import { useTranslation } from 'next-i18next'

import { AccountDataTable } from '@/components/account'
import { PageHeader, Layout } from '@/components/layout'
import { route, withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('account')

  return (
    <Layout>
      <PageHeader
        action={{
          href: route.accountAdd.pathname,
          label: t`page.index.action`,
        }}
      />
      <AccountDataTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['account']),
  }
}

export default Page
