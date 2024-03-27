import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { EditLinkForm } from '@/components/link/containers'

import type { GetServerSideProps } from 'next'

const EditLinkPage: React.FC = () => {
  const { t } = useTranslation('pages')

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
