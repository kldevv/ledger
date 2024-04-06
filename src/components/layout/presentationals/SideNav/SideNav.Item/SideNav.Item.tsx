import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Icon } from '@/components/core/presentationals'

import type { OutlineIconProps } from '@/components/core/presentationals'
import type { UrlObject } from 'url'

export interface SideNavItemProps {
  /**
   * Icon name
   */
  icon?: OutlineIconProps['name']
  /**
   * Item label
   */
  label: string
  /**
   * Item href
   */
  href: string | UrlObject
}

export const SideNavItem: React.FC<SideNavItemProps> = ({
  icon,
  label,
  href,
}) => {
  const { pathname } = useRouter()

  const active =
    typeof href === 'string' ? pathname === href : pathname === href.pathname

  return (
    <Link
      href={href}
      className={classNames(
        ' hover:bg-light-shades flex items-center rounded-md px-3 py-2 text-sm font-medium',
        { 'bg-light-shades': active, 'font-semibold': active },
      )}
    >
      {icon != null && (
        <span className="mr-2 min-w-max">
          <Icon.Outline stroke={1.5} name={icon} />
        </span>
      )}
      {label}
    </Link>
  )
}
