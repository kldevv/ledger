import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '@/components/layout/containers'
import { BranchTables } from '@/packages/features/branch/components'

import type { GetServerSideProps } from 'next'

const BranchesPage: React.FC = () => (
  <Layout>
    <BranchTables />
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'branch',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default BranchesPage
