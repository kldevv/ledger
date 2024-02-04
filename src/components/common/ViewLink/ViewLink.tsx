import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import type { UrlObject } from 'url'

export interface ViewLinkProps {
  href: string | UrlObject
}

export const ViewLink: React.FC<ViewLinkProps> = ({ href }) => {
  const { t } = useTranslation('common')

  return (
    <div className="w-full text-right">
      <Link
        href={href}
        className="text-light-accent text-xs font-medium leading-6"
      >
        {t('ViewLink.label')}
      </Link>
    </div>
  )
}
