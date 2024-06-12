import clsx from 'clsx'

import { Icon } from '../Icon/Icon'

export interface BannerProps {
  /**
   * Banner title
   */
  title: string
  /**
   * Class name
   */
  className?: string
}

export const Banner: React.FC<BannerProps> = ({ title, className }) => (
  <div
    className={clsx(
      'bg-light-accent/20 border-light-accent flex items-center gap-x-1 rounded-md border-2 p-2 text-base',
      className,
    )}
    role="banner"
  >
    <Icon name="ExclamationCircleSolid" className="text-light-accent size-4" />
    <span className="text-light-accent font-medium">{title}</span>
  </div>
)
