import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { PageDescription } from '../PageDescription'
import { PageTitle } from '../PageTitle'

export const PageHead: React.FC = () => {
  const { t } = useTranslation('meta')
  const { pathname } = useRouter()

  return (
    <>
      <PageTitle>{t(`${pathname}.title`)}</PageTitle>
      <PageDescription>{t(`${pathname}.description`)}</PageDescription>
    </>
  )
}
