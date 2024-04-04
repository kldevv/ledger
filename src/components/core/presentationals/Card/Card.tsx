import classNames from 'classnames'

export type CardProps = {
  /**
   * Children component
   */
  children: React.ReactNode
  /**
   * Override class name
   */
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        'rounded-lg shadow box-shadow shadow-mid-gray bg-white',
        className,
      )}
    >
      <div className="w-full p-6">{children}</div>
    </div>
  )
}
