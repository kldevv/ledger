import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorLayout, Header } from '@/components/layout/presentationals'

import type { GetStaticProps } from 'next'

const Page = () => {
  const { t } = useTranslation('pages')

  return (
    <ErrorLayout>
      <Header header={t`error.500.header`} section={t`error.500.section`} />
    </ErrorLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'pages',
        'layout',
      ])),
    },
  }
}

export default Page
