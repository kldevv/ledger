import { useTranslation } from 'next-i18next'

import { AccountDataTable } from '@/components/account'
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
      <AccountDataTable />
    </Layout>
  )
}

export default Page
