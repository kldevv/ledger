import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core/presentationals'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { AddTreasuryBookForm } from '@/components/treasuryBook'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`branch.add.header`}
        section={
          <Trans
            i18nKey={'pages:branch.add.section'}
            components={{
              journal: <TextLink href={route.journal.home} />,
              account: <TextLink href={route.account.home} />,
              tag: <TextLink href={route.tag.home} />,
            }}
          />
        }
      />
      <AddTreasuryBookForm />
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
