import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { getRouteByPathname } from '@/lib'

import { PageDescription } from '../PageDescription'
import { PageTitle } from '../PageTitle'

export const PageHead: React.FC = () => {
  const { t } = useTranslation('route')
  const { pathname } = useRouter()

  const route = getRouteByPathname(pathname)

  const title =
    route != null ? t(route.titleTranslateKye) : t`meta:PageHead.title`

  const description =
    route != null ? t(route.titleTranslateKye) : t('meta:PageHead.description')

  return (
    <>
      <PageTitle>{`${title} - ${t(`meta:PageHead.titleSuffix`)}`}</PageTitle>
      <PageDescription>{description}</PageDescription>
    </>
  )
}
