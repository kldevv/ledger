import { useTranslation } from 'next-i18next'

import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/lib'
import { ExchangeDataTable } from '@/components/exchange'

const Page: React.FC = () => {
  const { t } = useTranslation('exchange')

  return (
    <Layout>
      <PageHeader
        action={{
          href: route.exchangeAdd.pathname,
          label: t`page.index.action`,
        }}
      />
      <ExchangeDataTable />
    </Layout>
  )
}

export default Page
