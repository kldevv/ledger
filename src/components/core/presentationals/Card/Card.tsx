import classNames from 'classnames'

import { Spinner } from '..'

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
      className={classNames(
        'rounded-lg shadow shadow-mid-gray bg-white',
        className,
      )}
    >
      <div className="w-full items-center p-6">
        {loading ? (
          <div className="flex size-full h-60 items-center justify-center">
            <Spinner className="size-10" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
