import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { EntryDataTable } from '@/components/entry'
import { Layout, Header } from '@/components/layout'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header header={t`entry.header`} section={t`entry.section`} />
      <EntryDataTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'entry',
        'layout',
        'common',
        'pages',
        'route',
      ])),
    },
  }
}

export default Page
