import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core/presentationals'
import { Layout, Header } from '@/components/layout'
import { route } from '@/shared'

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
              branch: <TextLink href={route.branch.home} />,
            }}
          />
        }
      />
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
