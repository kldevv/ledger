import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Layout, Header } from '@/components/layout'
import { TreasuryBookDetails } from '@/components/treasuryBook'
import { route, withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')
  const { query } = useRouter()

  return (
    <Layout>
      <Header
        header={t`branch.details.header`}
        section={t`branch.details.section`}
        link={{
          href: { pathname: route.branch.edit.pathname, query },
          label: t`branch.details.link`,
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
