import { useTranslation } from 'next-i18next'

import { ExchangeDetails } from '@/components/exchange'
import { Layout, Header } from '@/components/layout'
import { withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('pages')

  return (
    <Layout>
      <Header
        header={t`xjournal.edit.header`}
        section={t`xjournal.edit.section`}
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
