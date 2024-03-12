import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ExchangeDetails } from '@/components/exchange'
import { Layout, Header } from '@/components/layout'
import { route, withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('exchange')
  const { query } = useRouter()

  return (
    <Layout>
      <Header
        header={t`xjournal.details.header`}
        section={t`xjournal.details.section`}
        link={{
          label: t`xjournal.details.link`,
          href: { pathname: route.xjournal.edit.pathname, query },
        }}
      />
      <ExchangeDetails />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['xjournal']),
  }
}

export default Page
