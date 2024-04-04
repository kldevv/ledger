import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '@/components/layout/containers'
import { Header } from '@/components/layout/presentationals'
import { EditTagForm } from '@/components/tag/containers'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`tag.details.edit.header`}
        section={t`tag.details.edit.section`}
      />
      <EditTagForm />
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
