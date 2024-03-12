import { useTranslation } from 'next-i18next'

import { AddAccountFrom } from '@/components/account'
import { Layout, Header } from '@/components/layout'
import { withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header header={t`account.add.header`} section={t`account.add.section`} />
      <AddAccountFrom />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['account']),
  }
}

export default Page
