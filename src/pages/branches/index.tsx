import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { BranchesTable } from '@/components/branch/containers'
import { TextLink } from '@/components/core/presentationals'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { route } from '@/shared/route'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`branch.header`}
        section={
          <Trans
            i18nKey={'pages:branch.section'}
            components={{
              accountGroup: <TextLink href={route.accountGroup.home} />,
              account: <TextLink href={route.account.home} />,
            }}
          />
        }
        link={{ href: route.branch.add, label: t`branch.link` }}
      />
      <BranchesTable />
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
