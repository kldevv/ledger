import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TextLink } from '@/components/core/presentationals'
import { Layout, Header } from '@/components/layout'
import { EditLinkForm } from '@/components/link/containers'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const EditLinkPage: React.FC = () => {
  const { t } = useTranslation('pages')
  const { query } = useRouter()

  return (
    <Layout>
      <Header
        header={t`link.details.edit.header`}
        section={t`link.details.edit.section`}
      />
      <EditLinkForm />
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

export default EditLinkPage
