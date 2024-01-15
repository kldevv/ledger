import classNames from 'classnames'

export type TableCellProps = {
  /**
   * Children component
   */
  children: React.ReactNode
  /**
   * Customize classname
   */
  className?: string
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
}) => {
  return (
    <td
      className={classNames(
        'text-left text-xs text-gray min-w-fit',
        'py-4 pr-12 first:pl-3 first:pr-3 last:pr-3',
        className,
      )}
    >
      {children}
    </td>
  )
}
