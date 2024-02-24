import classNames from 'classnames'

export type CardProps = {
  /**
   * Children component
   */
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children }) => {
  const cn = classNames(
    'rounded-lg shadow box-shadow shadow-mid-gray',
    'w-full',
    'bg-white',
  )

  return (
    <div className={cn}>
      <div className="w-full px-6 py-3">{children}</div>
    </div>
  )
}
