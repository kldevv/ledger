import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core/presentationals'
import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { AddLinkForm } from '@/components/link/containers'
import { route } from '@/shared/route'

import type { GetServerSideProps } from 'next'

const AddLinkPage: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`link.add.header`}
        section={
          <Trans
            i18nKey={'pages:link.add.section'}
            components={{
              journal: <TextLink href={route.journal.home} />,
              branch: <TextLink href={route.branch.home} />,
            }}
          />
        }
      />
      <AddLinkForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'link',
        'layout',
        'common',
        'pages',
      ])),
    },
  }
}

export default AddLinkPage
