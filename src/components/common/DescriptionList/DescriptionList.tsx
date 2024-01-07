import { Card } from '..'
import type { ItemProps } from './Item'
import { Item } from './Item'

export type DescriptionListItem = ItemProps

export interface DescriptionListProps {
  /**
   * Items
   */
  items: DescriptionListItem[]
}

export const DescriptionList: React.FC<DescriptionListProps> = ({ items }) => {
  return (
    <Card>
      <div className="w-full">
        <dl>
          {items.map((item) => (
            <Item key={item.title} {...item} />
          ))}
        </dl>
      </div>
    </Card>
  )
}
