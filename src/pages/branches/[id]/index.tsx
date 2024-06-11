import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '@/components/layout/containers'
import { BranchDetails } from '@/packages/features/branch/components'

import type { GetServerSideProps } from 'next'

const BranchDetailsPage: React.FC = () => (
  <Layout>
    <BranchDetails />
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

export default BranchDetailsPage
