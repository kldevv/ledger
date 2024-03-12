import { useTranslation } from 'next-i18next'

import { UpdateAccountForm } from '@/components/account'
import { Layout, Header } from '@/components/layout'
import { withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`account.edit.header`}
        section={t`account.edit.section`}
      />
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
