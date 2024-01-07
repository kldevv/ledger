import { useTranslation } from 'next-i18next'

import { InsertAccountFrom } from '@/components/account'
import { PageHeader, Layout } from '@/components/layout'

const Page: React.FC = () => {
  const { t } = useTranslation('account')

  return (
    <Layout prev="/account">
      <PageHeader
        title={t('page.add.index.title')}
        subtitle={t('page.add.index.subtitle')}
      />
      <InsertAccountFrom />
    </Layout>
  )
}

export default Page
