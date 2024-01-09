import classNames from 'classnames'

export interface HeaderProps extends React.ComponentPropsWithoutRef<'th'> {
  /**
   * Children component
   */
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <th
      className={classNames(
        'text-left text-xs font-medium text-dark-shades ',
        'p-3',
        'text-gray whitespace-nowrap',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}
