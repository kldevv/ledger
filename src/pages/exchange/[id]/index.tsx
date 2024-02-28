import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ExchangeDetails } from '@/components/exchange'
import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/shared'

const Page: React.FC = () => {
  const { t } = useTranslation('exchange')
  const { query } = useRouter()

  return (
    <Layout>
      <PageHeader
        action={{
          href: { pathname: route.exchangeDetailsEdit.pathname, query },
          label: t`page.[id].index.action`,
        }}
      />
      <ExchangeDetails />
    </Layout>
  )
}

export default Page
