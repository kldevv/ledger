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
  /**
   * Variant
   */
  variant?: 'primary' | 'secondary'
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  variant = 'primary',
}) => {
  const bgColor = variant === 'primary' ? 'bg-white' : 'bg-light-shades'

  return (
    <td
      className={classNames(
        'text-left text-xs text-gray min-w-fit',
        'py-4 pr-12 first:px-4 last:pr-3',
        bgColor,
        className,
      )}
    >
      {children}
    </td>
  )
}
