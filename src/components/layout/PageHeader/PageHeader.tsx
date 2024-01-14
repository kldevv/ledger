import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import type { UrlObject } from 'url'

export type PageHeaderProps = {
  action?: {
    /**
     * Page header action href
     */
    href: string | UrlObject
    /**
     * Page header action label
     */
    label: string
  }
}

export const PageHeader: React.FC<PageHeaderProps> = ({ action }) => {
  const { t } = useTranslation('route')
  const { pathname } = useRouter()

  return (
    <div className="flex items-center">
      <div className="flex flex-col space-y-3">
        <h1 className="text-dark-shades font-extrabold text-3xl whitespace-nowrap">
          {t(`${pathname}.title`)}
        </h1>
        <p className="text-gray text-base">{t(`${pathname}.description`)}</p>
      </div>
      {action && (
        <div className="ml-auto">
          <div className="ml-16">
            <Link href={action.href}>
              <div className="text-xs leading-6 font-semibold bg-light-accent text-light-shades py-1 px-3 rounded-md whitespace-nowrap">
                {action.label}
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
