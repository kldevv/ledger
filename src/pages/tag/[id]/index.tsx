import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Header, Layout } from '@/components/layout'
import { TagDetails } from '@/components/tag'
import { route, withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')
  const { query } = useRouter()

  return (
    <Layout>
      <Header
        header={t`tag.details.header`}
        section={t`tag.details.section`}
        link={{
          label: t`tag.details.link`,
          href: { pathname: route.tag.edit.pathname, query },
        }}
      />
      <TagDetails />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['tag']),
  }
}

export default Page
