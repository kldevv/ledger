import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core/presentationals'
import { Header, Layout } from '@/components/layout'
import { TreasuryBookDataTable } from '@/components/treasuryBook'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  //       // "section": [
  //   "A branch serves as the primary entity for transactions, encompassing a collection of account groups and individual accounts.",
  //   "Each branch is associated with a specific currency, ensuring that all transactions within the branch occur exclusively in that currency.",
  //   "The branch details can be located within the branch table below."
  // ],

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
      <TreasuryBookDataTable />
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
