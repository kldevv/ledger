import { useTranslation } from 'next-i18next'

import { PageHeader, Layout } from '@/components/layout'
import { TransactionDashboard } from '@/components/transaction'
import { route } from '@/lib'

const Page: React.FC = () => {
  const { t } = useTranslation('transaction')

  return (
    <Layout>
      <PageHeader
        action={{
          href: route.transactionAdd.pathname,
          label: t`page.index.action`,
        }}
      />
      <TransactionDashboard />
    </Layout>
  )
}

export default Page
