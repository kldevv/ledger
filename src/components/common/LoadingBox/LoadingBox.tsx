import classNames from 'classnames'

export interface LoadingBoxProps {
  /**
   * Override default class name
   */
  className?: string
}

export const LoadingBox: React.FC<LoadingBoxProps> = ({ className }) => {
  return (
    <div
      className={classNames(
        'bg-mid-gray h-6 w-32 animate-pulse rounded',
        className,
      )}
    />
  )
}
