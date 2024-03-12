import { useTranslation } from 'next-i18next'

import { Layout, Header } from '@/components/layout'
import { AddTreasuryBookForm } from '@/components/treasuryBook'
import { withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header header={t`branch.add.header`} section={t`branch.add.section`} />
      <AddTreasuryBookForm />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['branch']),
  }
}

export default Page
