import classNames from 'classnames';

export type CellProps = {
  /**
   * Children component
   */
  children: React.ReactNode;
};

export const Cell: React.FC<CellProps> = ({ children }) => {
  return (
    <td
      className={classNames(
        'text-left text-sm text-gray min-w-fit',
        'p-3',
        'first:pl-0',
        'last:pr-0'
      )}
    >
      {children}
    </td>
  );
};
