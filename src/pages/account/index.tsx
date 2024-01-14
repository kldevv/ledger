import { useTranslation } from 'next-i18next'

import { AccountDashboard } from '@/components/account'
import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/lib'

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
      <AccountDashboard />
    </Layout>
  )
}

export default Page
