import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AddAccountFrom } from '@/components/account'
import { TextLink } from '@/components/core'
import { Layout, Header } from '@/components/layout'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`account.add.header`}
        section={
          <Trans
            i18nKey={'pages:account.add.section'}
            components={{
              entry: <TextLink href={route.entry.home} />,
              accountGroup: <TextLink href={route.accountGroup.home} />,
            }}
          />
        }
      />
      <AddAccountFrom />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'account',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
