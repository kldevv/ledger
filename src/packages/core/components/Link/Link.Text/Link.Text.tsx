import clsx from 'clsx'
import Link from 'next/link'

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
    <Link
      {...props}
      className={clsx(
        linkTextVariant[variant],
        'whitespace-nowrap text-nowrap',
        className,
      )}
    >
      {children}
    </Link>
  )
}

const linkTextVariant = {
  primary: 'text-light-accent hover:text-light-accent/60',
  secondary: 'text-dark-shades hover:text-dark-shades/60',
} as const
