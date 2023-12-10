
export type CardProps = {
  /**
   * Children component
   */
  children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="-mx-4 mt-6 max-w-md rounded-lg shadow overflow-auto box-shadow shadow-darkMidGray text-darkShades">
      <div className="px-4 py-3">{children}</div>
    </div>
  );
};