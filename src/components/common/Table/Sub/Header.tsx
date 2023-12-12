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
        'text-left text-sm font-normal text-dark-shades ',
        'p-3',
        'first:pl-0',
        'last:pr-0'
      )}
    >
      {children}
    </th>
  );
};
