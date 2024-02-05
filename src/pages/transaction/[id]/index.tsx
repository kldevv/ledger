import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { PageHeader, Layout } from '@/components/layout'
import { TransactionDetails } from '@/components/transaction'
import { route } from '@/lib'

const Page: React.FC = () => {
  const { t } = useTranslation('transaction')
  const { query } = useRouter()

  return (
    <Layout>
      <PageHeader
        action={{
          href: {
            pathname: route.transactionDetailEdit.pathname,
            query,
          },
          label: t`page.[id].index.action`,
        }}
      />
      <TransactionDetails />
    </Layout>
  )
}

export default Page
