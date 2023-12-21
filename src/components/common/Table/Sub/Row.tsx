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
};

export const Row: React.FC<RowProps> = ({ children, index }) => {
  return (
    <tr className={classNames('rounded-lg', index & 1 ? 'bg-white' : 'bg-light-shades')}>
      {children}
    </tr>
  )
}