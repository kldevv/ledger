import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { PageHeader, Layout } from '@/components/layout'
import { TreasuryBookDetails } from '@/components/treasuryBook'
import { route, withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('branch')
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['branch']),
  }
}

export default Page
