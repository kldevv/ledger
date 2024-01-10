import { Card, DescriptionListItem } from '@/components/common'

import type { DescriptionListItemProps } from '@/components/common'

export interface DescriptionListProps {
  /**
   * Items
   */
  items: DescriptionListItemProps[]
}

export const DescriptionList: React.FC<DescriptionListProps> = ({ items }) => {
  return (
    <Card>
      <div className="w-full">
        <dl>
          {items.map((item) => (
            <DescriptionListItem key={item.title} {...item} />
          ))}
        </dl>
      </div>
    </Card>
  )
}
