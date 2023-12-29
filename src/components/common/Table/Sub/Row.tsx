import classNames from "classnames";

export type RowProps = {
  /**
   * Children component
   */
  children: React.ReactNode;
  /**
   * Row index
   */
  index: number
  /**
   * Customize classname
   */
  className?: string
};

export const Row: React.FC<RowProps> = ({ children, index, className }) => {
  return (
    <tr
      className={classNames(
        'rounded-lg',
        index & 1 ? 'bg-white' : 'bg-light-shades',
        'relative',
        className
      )}
    >
      {children}
    </tr>
  );
};