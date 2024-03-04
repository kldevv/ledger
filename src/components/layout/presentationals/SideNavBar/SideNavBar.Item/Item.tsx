import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Icon } from '@/components/common'

import type { OutlineIconProps } from '@/components/common'
import type { UrlObject } from 'url'

export interface ItemProps {
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

export const Item: React.FC<ItemProps> = ({ icon, label, href }) => {
  const { pathname } = useRouter()

  const active =
    typeof pathname === 'string'
      ? pathname === href
      : pathname === (href as UrlObject).pathname

  return (
    <Link
      href={href}
      className={classNames(
        ' hover:bg-light-shades flex items-start rounded-md px-3 py-2 text-sm font-medium',
        { 'bg-light-shades': active },
      )}
    >
      {icon && <Icon.Outline className="mr-2" stroke={1.5} name={icon} />}
      {label}
    </Link>
  )
}
