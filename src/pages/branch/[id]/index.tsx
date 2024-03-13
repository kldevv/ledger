import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout, Header } from '@/components/layout'
import { TreasuryBookDetails } from '@/components/treasuryBook'
import { route } from '@/shared'

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

export default Page
