import classNames from 'classnames'

import type { EntryStatus } from '@/api/graphql'

export interface StatusIndicatorProps {
  /**
   * Class name
   */
  className?: string
  /**
   * Size
   */
  size?: string
  /**
   * Status
   */
  status: EntryStatus
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  className,
  status,
  size = 'size-1.5',
}) => {
  const [haloColor, coreColor] = Color[status]

  return (
    <div className={classNames('p-1', 'rounded-full', 'flex-none', haloColor)}>
      <div className={classNames('rounded-full', size, coreColor, className)} />
    </div>
  )
}

const Color = {
  COMPLETED: ['bg-green-halo', 'bg-green'] as const,
  PENDING: ['bg-yellow-halo', 'bg-yellow'] as const,
} as const
