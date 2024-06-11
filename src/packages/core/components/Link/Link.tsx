import clsx from 'clsx'

import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'

import { LinkCore, type LinkCoreProps } from './Link.Core/Link.Core'
import { LinkText } from './Link.Text/Link.Text'

export interface LinkProps extends LinkCoreProps {
  /**
   * Variant
   */
  variant: 'primary' | 'secondary'
  /**
   * Loading
   */
  loading?: boolean
}

export const Link: React.FC<LinkProps> & {
  Text: typeof LinkText
} = ({ variant, className, children, loading = false, ...props }) => (
  <LinkCore
    {...props}
    loading={loading}
    className={clsx(
      LinkVariant[variant],
      'flex size-full items-center justify-center rounded-md px-3 py-1',
      className,
    )}
  >
    {loading ? <LoadingSpinner className="size-3" /> : children}
  </LinkCore>
)

Link.Text = LinkText

const LinkVariant = {
  primary:
    'border-2 bg-light-accent hover:bg-light-accent/60 text-light-shades',
  secondary:
    'border-2 border-light-accent hover:bg-light-accent/10 text-light-accent',
} as const
