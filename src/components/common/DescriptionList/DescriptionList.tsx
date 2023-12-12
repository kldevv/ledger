import { Card } from ".."
import { Item, ItemProps } from "./Item";

export type DescriptionListItem = ItemProps

export interface DescriptionListProps {
  /**
   * Items
   */
  items: DescriptionListItem[];
}

export const DescriptionList: React.FC<DescriptionListProps> = ({ items }) => {
  return (
    <Card>
      <div className="w-full">
        <dl>
          {items.map((item) => (
            <Item {...item}/>
          ))}
        </dl>
      </div>
    </Card>
  );
}