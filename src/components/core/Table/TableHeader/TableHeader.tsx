import classNames from 'classnames'

export interface TableHeaderProps extends React.ComponentPropsWithoutRef<'th'> {
  /**
   * Children component
   */
  children?: React.ReactNode
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <th
      className={classNames(
        'text-left text-xs font-medium text-dark-shades ',
        'py-2 pr-12 first:px-4 last:pr-3',
        'text-dark-shades whitespace-nowrap',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}
