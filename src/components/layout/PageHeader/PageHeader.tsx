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
  /**
   * Hide description?
   */
  hideDescription?: boolean
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  action,
  hideDescription = false,
}) => {
  const { t } = useTranslation('route')
  const { pathname } = useRouter()

  return (
    <div className="my-3 flex items-center">
      <div className="flex flex-col space-y-3">
        <h1 className="text-dark-shades whitespace-nowrap text-3xl font-extrabold">
          {t(`${pathname}.title`)}
        </h1>
        {hideDescription === false && (
          <p className="text-gray text-base">{t(`${pathname}.description`)}</p>
        )}
      </div>
      {action && (
        <div className="ml-auto">
          <div className="ml-16">
            <Link
              href={action.href}
              className="bg-light-accent text-light-shades hover:bg-light-shades hover:text-light-accent hover:border-light-accent whitespace-nowrap rounded-md px-4 py-2 text-xs font-semibold leading-6 hover:border-2"
            >
              {action.label}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
