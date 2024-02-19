import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/shared'
import { TreasuryBookDetails } from '@/components/treasuryBook'

const Page: React.FC = () => {
  const { t } = useTranslation('treasuryBook')
  const { query } = useRouter()

  return (
    <Layout>
      <PageHeader
        action={{
          href: {
            pathname: route.treasuryBookDetailEdit.pathname,
            query,
          },
          label: t`page.[id].index.action`,
        }}
      />
      <TreasuryBookDetails />
    </Layout>
  )
}

export default Page
