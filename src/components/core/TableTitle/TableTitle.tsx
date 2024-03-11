import classNames from 'classnames'

export const TableTitle: React.FC<React.ComponentPropsWithoutRef<'h3'>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      {...props}
      className={classNames(
        'font-semibold text-dark-shades leading-6 whitespace-nowrap text-base',
        className,
      )}
    >
      {children}
    </h3>
  )
}
