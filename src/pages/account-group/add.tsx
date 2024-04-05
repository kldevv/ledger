import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AddAccountGroupForm } from '@/components/accountGroup/containers'
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
        header={t`account.group.add.header`}
        section={
          <Trans
            i18nKey={'pages:account.group.add.section'}
            components={{ account: <TextLink href={route.account.home} /> }}
          />
        }
      />
      <AddAccountGroupForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'accountGroup',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
