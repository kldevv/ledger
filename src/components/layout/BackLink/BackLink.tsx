import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import type { UrlObject } from 'url'

export type BackButtonProps = {
  /**
   * Route to go back to
   */
  href: string | UrlObject
}

export const BackLink: React.FC<BackButtonProps> = ({ href }) => {
  const { t } = useTranslation('layout')

  return (
    <Link href={href} className="-ml-5 w-fit">
      <div className="text-gray flex items-center gap-x-1 font-normal text-sm h-4">
        <ChevronLeftIcon className="w-4 h-4" />
        {href === '/' ? t('BackLink.label.home') : t('BackLink.label.back')}
      </div>
    </Link>
  )
}
