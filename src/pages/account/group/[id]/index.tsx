import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CategoryDetails } from '@/components/category'
import { PageHeader, Layout } from '@/components/layout'
import { route, withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('accountGroup')
  const { query } = useRouter()

  return (
    <Layout>
      <PageHeader
        action={{
          href: {
            pathname: route.categoryDetailEdit.pathname,
            query,
          },
          label: t`page.[id].index.action`,
        }}
      />
      <CategoryDetails />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['account']),
  }
}

export default Page
