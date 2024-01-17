import { useTranslation } from 'next-i18next'

import { PageHeader, Layout } from '@/components/layout'
import { TreasuryBookDataTable } from '@/components/vault'
import { route } from '@/lib'

const Page: React.FC = () => {
  const { t } = useTranslation('vault')

  return (
    <Layout>
      <PageHeader
        action={{
          href: route.treasuryBookAdd.pathname,
          label: t`page.index.action`,
        }}
      />
      <TreasuryBookDataTable />
    </Layout>
  )
}

export default Page
