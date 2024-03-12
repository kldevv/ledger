import { useTranslation } from 'next-i18next'

import { Layout, Header } from '@/components/layout'
import { UpdateTreasuryBookForm } from '@/components/treasuryBook'
import { withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`branch.details.edit.header`}
        section={t`branch.details.edit.section`}
      />
      <UpdateTreasuryBookForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['branch']),
  }
}
export default Page
