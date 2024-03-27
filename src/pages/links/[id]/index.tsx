import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core/presentationals'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { LinkDetails } from '@/components/link/containers'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const LinkDetailsPage: React.FC = () => {
  const { t } = useTranslation('pages')
  const { query } = useRouter()

  return (
    <Layout>
      <Header
        header={t`link.details.header`}
        section={
          <Trans
            i18nKey={'pages:link.details.section'}
            components={{
              journal: <TextLink href={route.journal.home} />,
              branch: <TextLink href={route.branch.home} />,
            }}
          />
        }
        link={{
          href: { pathname: route.link.edit.pathname, query },
          label: t`link.details.link`,
        }}
      />
      <LinkDetails />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'journal',
        'link',
        'layout',
        'common',
        'pages',
      ])),
    },
  }
}

export default LinkDetailsPage
