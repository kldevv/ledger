import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PageHeader, Layout } from '@/components/layout'
import { TreasuryBookDetails } from '@/components/treasuryBook'
import { route } from '@/shared'

import type { GetStaticProps } from 'next'

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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'layout',
        'treasuryBook',
        'route',
      ])),
    },
  }
}

export default Page
