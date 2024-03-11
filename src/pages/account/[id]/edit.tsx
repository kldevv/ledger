import { UpdateAccountForm } from '@/components/account'
import { PageHeader, Layout } from '@/components/layout'
import { withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  return (
    <Layout>
      <PageHeader />
      <UpdateAccountForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['account']),
  }
}

export default Page
