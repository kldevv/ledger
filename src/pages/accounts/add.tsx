import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AddAccountForm } from '@/components/account/containers'
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
      <AddAccountForm />
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
