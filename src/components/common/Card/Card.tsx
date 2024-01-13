import classNames from 'classnames'

export type CardProps = {
  /**
   * Children component
   */
  children: React.ReactNode
}

/**
 * Div container with shadow and border
 */
export const Card: React.FC<CardProps> = ({ children }) => {
  const cn = classNames(
    '-mx-5 mt-6',
    'rounded-lg shadow box-shadow shadow-mid-gray',
    'w-full',
    'max-w-screen-lg',
    'bg-white',
  )

  return (
    <div className={cn}>
      <div className="px-5 py-3 w-full overflow-auto">{children}</div>
    </div>
  )
}
