import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { PageDescription } from '../PageDescription'
import { PageTitle } from '../PageTitle'

export const PageHead: React.FC = () => {
  const { t } = useTranslation('route')
  const { pathname } = useRouter()

  const title = `${t(`${pathname}.title`)} - ${t(`meta:PageHead.titleSuffix`)}`

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <PageDescription>{t(`${pathname}.description`)}</PageDescription>
    </>
  )
}
