export type RowProps = {
  /**
   * Children component
   */
  children: React.ReactNode;
};

export const Row: React.FC<RowProps> = ({ children }) => {
  return (
    <tr className="border-b border-b-mid-gray gap-x-1 last:border-0">
      {children}
    </tr>
  )
}