import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AddCategoryFrom } from '@/components/category'
import { TextLink } from '@/components/core'
import { Layout, Header } from '@/components/layout'
import { route } from '@/shared'

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
      <AddCategoryFrom />
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
