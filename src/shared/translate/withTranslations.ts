import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const withTranslations = async (
  locale?: string,
  namespaces?: string[],
) => {
  return await serverSideTranslations(locale ?? 'en', [
    ...(namespaces ?? []),
    'layout',
    'common',
    'pages',
    'route',
  ])
}
