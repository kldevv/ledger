import { useTranslation } from 'next-i18next'

import { PageHeader, Layout } from '@/components/layout'
import { VaultTable } from '@/components/vault'
import { route } from '@/lib'

const Page: React.FC = () => {
  const { t } = useTranslation('vault')

  return (
    <Layout prev="/">
      <PageHeader
        title={t`page.index.title`}
        subtitle={t`page.index.subtitle`}
        link={{
          href: route.treasuryBookHome.pathname,
          label: t`page.index.link`,
        }}
      />
      <VaultTable />
    </Layout>
  )
}

export default Page
