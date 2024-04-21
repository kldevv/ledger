import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core/presentationals'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { UserDetails } from '@/components/user/containers'
import { route } from '@/shared/route'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`user.header`}
        section={
          <Trans
            i18nKey={'pages:user.section'}
            components={{
              links: <TextLink href={route.link.home} />,
              branch: <TextLink href={route.branch.home} />,
            }}
          />
        }
      />
      <UserDetails />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'user',
        'common',
        'pages',
        'layout',
      ])),
    },
  }
}

export default Page
