import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core'
import { EntryDataTable } from '@/components/entry'
import { Layout, Header } from '@/components/layout'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`entry.header`}
        section={
          <Trans
            i18nKey={'pages:entry.section'}
            components={{
              journal: <TextLink href={route.journal.home} />,
              account: <TextLink href={route.account.home} />,
            }}
          />
        }
      />
      <EntryDataTable />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'entry',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
