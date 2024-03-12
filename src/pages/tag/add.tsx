import { useTranslation } from 'react-i18next'

import { Layout, Header } from '@/components/layout'
import { AddTagForm } from '@/components/tag'
import { withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header header={t`tag.add.header`} section={t`tag.section`} />
      <AddTagForm />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['tag']),
  }
}

export default Page
