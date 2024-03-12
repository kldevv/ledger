import { useTranslation } from 'next-i18next'

import { EntryDataTable } from '@/components/entry'
import { Layout, Header } from '@/components/layout'
import { withTranslations } from '@/shared'

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
    props: await withTranslations(locale, ['entry']),
  }
}

export default Page
