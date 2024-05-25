import classNames from 'classnames'

export interface LoadingBoxProps {
  /**
   * Class name?
   */
  className?: string
}

export const LoadingBox: React.FC<LoadingBoxProps> = ({ className }) => {
  return (
    <div
      data-testid="loading-box"
      className={classNames('bg-mid-gray animate-pulse rounded', className)}
    />
  )
}
