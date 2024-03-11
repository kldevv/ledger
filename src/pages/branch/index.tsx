import { useTranslation } from 'next-i18next'

import { Header, Layout } from '@/components/layout'
import { TreasuryBookDataTable } from '@/components/treasuryBook'
import { route, withTranslations } from '@/shared'

import type { GetStaticProps } from 'next'

const Page: React.FC = () => {
  const { t } = useTranslation('branch')

  //       // "section": [
  //   "A branch serves as the primary entity for transactions, encompassing a collection of account groups and individual accounts.",
  //   "Each branch is associated with a specific currency, ensuring that all transactions within the branch occur exclusively in that currency.",
  //   "The branch details can be located within the branch table below."
  // ],

  return (
    <Layout>
      <Header
        header={t`page.index.header`}
        section={t`page.index.section`}
        link={{ href: route.treasuryBookAdd, label: t`page.index.link` }}
      />
      <TreasuryBookDataTable />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withTranslations(locale, ['branch']),
  }
}

export default Page
