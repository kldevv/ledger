import classNames from 'classnames';

export type CellProps = {
  /**
   * Children component
   */
  children: React.ReactNode;
  /**
   * Customize classname
   */
  className?: string;
};

export const Cell: React.FC<CellProps> = ({ children, className }) => {
  return (
    <td
      className={classNames(
        'text-left text-xs text-gray min-w-fit',
        'p-3',
        className,
      )}
    >
      {children}
    </td>
  );
};
