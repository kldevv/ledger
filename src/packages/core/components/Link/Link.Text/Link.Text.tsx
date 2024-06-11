import clsx from 'clsx'

import { LinkCore, type LinkCoreProps } from '../Link.Core/Link.Core'

export interface LinkTextProps extends LinkCoreProps {
  /**
   * Variant
   */
  variant: 'primary' | 'secondary'
}

export const LinkText: React.FC<LinkTextProps> = ({
  variant,
  className,
  ...props
}) => (
  <LinkCore {...props} className={clsx(LinkTextVariant[variant], className)} />
)

const LinkTextVariant = {
  primary: 'text-light-accent hover:text-light-accent/60',
  secondary: 'text-dark-shades hover:text-dark-shades/60',
} as const
