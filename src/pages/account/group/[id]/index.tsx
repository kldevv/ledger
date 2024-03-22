import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CategoryDetails } from '@/components/category'
import { TextLink } from '@/components/core/presentationals'
import { Layout, Header } from '@/components/layout'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')
  const { query } = useRouter()

  return (
    <Layout>
      <Header
        header={t`account.group.details.header`}
        section={
          <Trans
            i18nKey={'pages:account.group.details.section'}
            components={{ account: <TextLink href={route.account.home} /> }}
          />
        }
        link={{
          href: { pathname: route.accountGroup.edit.pathname, query },
          label: t`account.group.details.link`,
        }}
      />
      <CategoryDetails />
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
