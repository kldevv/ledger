export type DescListItem = {
  /**
   * Title
   */
  title: string
  /**
   * Data
   */
  desc: React.ReactNode
}

export interface DescriptionListProps {
  /**
   * Items
   */
  items: DescListItem[]
}

export const DescList: React.FC<DescriptionListProps> = ({ items }) => {
  if (items.length === 0) return null

  return (
    <dl>
      {items.map(({ title, desc }) => (
        <div
          className="border-t-mid-gray grid grid-cols-2 items-center gap-x-8 border-t py-2 text-xs font-normal first:border-t-0"
          key={title}
        >
          <dt>
            <div className="text-gray">{title}</div>
          </dt>
          <dd>
            <div className="text-dark-shades">{desc}</div>
          </dd>
        </div>
      ))}
    </dl>
  )
}
