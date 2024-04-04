import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core/presentationals'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { route } from '@/shared/route'

import { TreasuryBookDetails } from '@/components/treasuryBook'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')
  const { query } = useRouter()

  return (
    <Layout>
      <Header
        header={t`branch.details.header`}
        section={
          <Trans
            i18nKey={'pages:branch.details.section'}
            components={{
              accountGroup: <TextLink href={route.accountGroup.home} />,
              account: <TextLink href={route.account.home} />,
            }}
          />
        }
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
