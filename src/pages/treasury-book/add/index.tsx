import { useTranslation } from 'next-i18next'

import { PageHeader, Layout } from '@/components/layout'
import { InsertVaultForm } from '@/components/vault'

const Page: React.FC = () => {
  const { t } = useTranslation('vault')

  return (
    <Layout>
      <PageHeader
        title={t`page.add.index.title`}
        subtitle={t`page.add.index.subtitle`}
      />
      <InsertVaultForm />
    </Layout>
  )
}

export default Page
