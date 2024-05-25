import classNames from 'classnames'
import Link from 'next/link'

import './Link.Text.css'

import type { LinkProps } from 'next/link'

export interface LinkTextProps extends React.PropsWithChildren<LinkProps> {
  /**
   * Variant
   */
  variant: 'primary' | 'secondary'
  /**
   * Class name?
   */
  className?: string
}

export const LinkText: React.FC<LinkTextProps> = ({
  children,
  variant,
  className,
  ...props
}) => {
  return (
    <Link {...props} className={classNames(`link-text-${variant}`, className)}>
      {children}
    </Link>
  )
}
