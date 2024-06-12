import clsx from 'clsx'

import { LoadingSpinner } from '..'

export type CardProps = {
  /**
   * Children component
   */
  children: React.ReactNode
  /**
   * Override class name
   */
  className?: string
  /**
   * Is loading?
   */
  loading?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  loading = false,
}) => {
  return (
    <div
      className={clsx(
        'shadow-mid-gray min-w-max rounded-lg bg-white shadow',
        className,
      )}
      data-testid="card"
    >
      <div className="w-full items-center p-6">
        {loading ? (
          <div className="flex size-full h-60 items-center justify-center">
            <LoadingSpinner className="size-10" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
