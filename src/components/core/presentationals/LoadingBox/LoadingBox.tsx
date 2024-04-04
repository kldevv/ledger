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
      className={classNames('bg-loading-gray animate-pulse rounded', className)}
    />
  )
}
