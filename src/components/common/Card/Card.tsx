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
    'max-w-screen-lg',
    'bg-white',
  )

  return (
    <div className={cn}>
      <div className="px-3 py-3 w-full">{children}</div>
    </div>
  )
}
