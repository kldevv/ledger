import { useTranslation } from 'next-i18next'

import { Layout, Header } from '@/components/layout'
import { TagDataTable } from '@/components/tag'
import { route, withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('tag')

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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['tag']),
  }
}

export default Page
