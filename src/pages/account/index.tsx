import { useTranslation } from 'next-i18next'

import { AccountDataTable } from '@/components/account'
import { Layout, Header } from '@/components/layout'
import { route, withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`account.header`}
        section={t`account.section`}
        link={{ href: route.account.add, label: t`account.link` }}
      />
      <AccountDataTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['account']),
  }
}

export default Page
