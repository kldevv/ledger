import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core/presentationals'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { AddTransactionForm } from '@/components/transaction'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`journal.add.header`}
        section={
          <Trans
            i18nKey={'pages:journal.add.section'}
            components={{
              branch: <TextLink href={route.branch.home} />,
              entry: <TextLink href={route.entry.home} />,
            }}
          />
        }
      />
      <AddTransactionForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'journal',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
