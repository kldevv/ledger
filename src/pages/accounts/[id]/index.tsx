import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccountDetails } from '@/components/account/containers'
import { TextLink } from '@/components/core/presentationals'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { route } from '@/shared/route'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')
  const { query } = useRouter()

  return (
    <Layout>
      <Header
        header={t`account.details.header`}
        section={
          <Trans
            i18nKey={'pages:account.details.section'}
            components={{
              journal: <TextLink href={route.journal.home} />,
              entry: <TextLink href={route.entry.home} />,
            }}
          />
        }
        link={{
          href: { pathname: route.account.edit.pathname, query },
          label: t`account.details.link`,
        }}
      />
      <AccountDetails />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'account',
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
