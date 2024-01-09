import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Item, Link as MenuLink } from '@radix-ui/react-navigation-menu'
import classNames from 'classnames'
import Link from 'next/link'

export type VaultLinkProps = {
  /**
   * Is active
   */
  active?: boolean
  /**
   * Is loading
   */
  loading?: boolean
  /**
   * Is error
   */
  error?: boolean
  /**
   * Vault route
   */
  route: string
  /**
   * Children component
   */
  children: React.ReactNode
}

export const VaultLink: React.FC<VaultLinkProps> = ({
  active = false,
  loading = false,
  error = false,
  children,
}) => {
  const cn = classNames(
    'mx-1',
    'flex gap-x-2 items-center',
    'font-semibold leading-6 text-xs text-main',
    'border rounded-xl bg-light-shades',
    // Hover
    'hover:bg-main hover:text-light-shades',
    // Active
    'data-[active]:bg-main data-[active]:text-light-shades',
  )

  if (loading || error) {
    return (
      <div
        className={classNames(
          cn,
          'bg-mid-gray text-light-shades',
          'hover:bg-mid-gray hover:text-light-shades',
        )}
      >
        <EllipsisHorizontalIcon className="w-5 h-5 mx-auto" />
      </div>
    )
  }

  return (
    <Item>
      <Link href={'/vault'} passHref legacyBehavior>
        <MenuLink active={active} className={cn}>
          {children}
        </MenuLink>
      </Link>
    </Item>
  )
}
