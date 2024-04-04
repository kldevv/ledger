import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AddBranchForm } from '@/components/branch/containers'
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
        header={t`branch.add.header`}
        section={
          <Trans
            i18nKey={'pages:branch.add.section'}
            components={{
              journal: <TextLink href={route.journal.home} />,
              account: <TextLink href={route.account.home} />,
              tag: <TextLink href={route.tag.home} />,
            }}
          />
        }
      />
      <AddBranchForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'branch',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
