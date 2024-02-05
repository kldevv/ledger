import { useTranslation } from 'next-i18next'

import { PageHeader, Layout } from '@/components/layout'
import { TransactionDataTable } from '@/components/transaction'
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
      <TransactionDataTable />
    </Layout>
  )
}

export default Page
