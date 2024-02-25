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
  const cn = classNames(
    'rounded-lg shadow box-shadow shadow-mid-gray',
    'w-full min-w-max',
    'bg-white',
    className,
  )

  return (
    <div className={cn}>
      <div className="w-full px-6 py-3">{children}</div>
    </div>
  )
}
