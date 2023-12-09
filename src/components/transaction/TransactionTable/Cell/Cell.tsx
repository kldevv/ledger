import classNames from "classnames";
import { useMemo } from "react";

export type CellProps = {
  /**
   * Children component
   */
  children: React.ReactNode;
  /**
   * Cell location, default is `center`
   */
  variant?: 'start' | 'center' | 'end'
};

export const Cell: React.FC<CellProps> = ({ children, variant = 'center'}) => {
    const padding = useMemo(
      () =>
        (() => {
          switch (variant) {
            case 'start':
              return 'pr-3 py-3'
            case 'end':
              return 'pl-3 py-3'
            case 'center':
            default:
              return 'p-3'
          }
        })(),
      []
    );

  return (
    <td className={classNames('text-left text-sm text-darkMidGray max-w-[6rem]', padding)}>
      {children}
    </td>
  );
};