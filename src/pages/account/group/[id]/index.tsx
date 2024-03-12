import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CategoryDetails } from '@/components/category'
import { Layout, Header } from '@/components/layout'
import { route, withTranslations } from '@/shared'

import type { GetServerSideProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')
  const { query } = useRouter()

  return (
    <Layout>
      <Header
        header={t`account.details.header`}
        section={t`account.details.section`}
        link={{
          href: { pathname: route.accountGroup.edit.pathname, query },
          label: t`account.details.link`,
        }}
      />
      <CategoryDetails />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['account']),
  }
}

export default Page
