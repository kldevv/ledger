import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core/presentationals'
import { Layout, Header } from '@/components/layout'
import { LinkDetails } from '@/components/link/containers'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const LinkDetailsPage: React.FC = () => {
  const { t } = useTranslation('pages')

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
        link={{ href: route.link.add, label: t`link.details.link` }}
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
