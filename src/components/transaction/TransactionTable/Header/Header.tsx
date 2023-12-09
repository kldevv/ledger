import classNames from 'classnames';
import { useMemo } from 'react';

export type HeaderProps = {
  /**
   * Children component
   */
  children?: React.ReactNode;
  /**
   * Header location, default is `center`
   */
  variant?: 'start' | 'center' | 'end';
};

export const Header: React.FC<HeaderProps> = ({ children, variant = 'center' }) => {
  const padding = useMemo(
    () =>
      (() => {
        switch (variant) {
          case 'start':
            return 'pr-3 py-3';
          case 'end':
            return 'pl-3 py-3';
          case 'center':
          default:
            return 'p-3';
        }
      })(),
    []
  );

  return (
    <th
      className={classNames(
        'text-left text-sm font-semibold text-darkShades ',
        padding
      )}
    >
      {children}
    </th>
  );
};
