import classNames from 'classnames';

export type HeaderProps = {
  /**
   * Children component
   */
  children?: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({
  children,
}) => {
  return (
    <th
      className={classNames(
        'text-left text-xs font-medium text-dark-shades ',
        'p-3',
        'text-gray whitespace-nowrap'
      )}
    >
      {children}
    </th>
  );
};
