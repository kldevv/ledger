import { Item, type ItemProps } from '../SideNavBar.Item/Item'
import { SectionTitle } from '../SideNavBar.SectionTitle/SectionTitle'

export interface SectionProps {
  /**
   * Section title, no title if undefined
   */
  title?: string
  /**
   * Section items
   */
  items: ItemProps[]
}

export const Section: React.FC<SectionProps> = ({ title, items }) => {
  return (
    <div className="flex flex-col">
      {title != null && <SectionTitle title={title} className="mb-2 ml-2" />}
      <div className="flex flex-col space-y-2">
        {items.map((props) => (
          <Item {...props} key={String(props.href)} />
        ))}
      </div>
    </div>
  )
}
