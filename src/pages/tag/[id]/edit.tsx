import { useTranslation } from 'next-i18next'

import { Layout, Header } from '@/components/layout'
import { UpdateTagForm } from '@/components/tag/UpdateTagForm'
import { withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`tag.details.edit.header`}
        section={t`tag.details.edit.section`}
      />
      <UpdateTagForm />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['tag']),
  }
}

export default Page
