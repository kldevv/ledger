import { useTranslation } from 'next-i18next'

import { Header, Layout } from '@/components/layout'
import { AccountBalanceTable } from '@/components/report'
import { withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header header={t`header`} section={t`section`} />
      <AccountBalanceTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['journal']),
  }
}

export default Page
