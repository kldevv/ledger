import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout, Header } from '@/components/layout'
import { TagDataTable } from '@/components/tag'
import { route } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`tag.header`}
        section={t`tag.section`}
        link={{ label: t`tag.link`, href: route.tag.add }}
      />
      <TagDataTable />
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
