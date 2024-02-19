import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { AccountDetails } from '@/components/account'
import { PageHeader, Layout } from '@/components/layout'
import { route } from '@/lib'

const Page: React.FC = () => {
  const { t } = useTranslation('account')
  const { query } = useRouter()

  return (
    <Layout>
      <PageHeader
        action={{
          href: {
            pathname: route.accountDetailEdit.pathname,
            query,
          },
          label: t('page.[id].index.action'),
        }}
      />
      <AccountDetails />
    </Layout>
  )
}

export default Page
