export interface ItemProps {
  /**
   * Title of the item
   */
  title: string;
  /**
   * Description of the item
   */
  description: React.ReactNode;
}

export const Item: React.FC<ItemProps> = ({ title, description }) => {
  return (
    <div className="py-2 border-t first:border-t-0 border-t-mid-gray items-center grid grid-cols-2 gap-x-8">
      <dt>
        <div className="text-sm font-normal text-dark-shades">{title}</div>
      </dt>
      <dd>
        <div className="max-w-xs text-sm font-light leading-6 text-gray">
          {description}
        </div>
      </dd>
    </div>
  );
};