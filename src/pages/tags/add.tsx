import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core/presentationals'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { AddTagForm } from '@/components/tag'
import { route } from '@/shared/route'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`tag.add.header`}
        section={
          <Trans
            i18nKey={'pages:tag.add.section'}
            components={{ journal: <TextLink href={route.journal.home} /> }}
          />
        }
      />
      <AddTagForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'tag',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
