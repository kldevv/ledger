export interface DescriptionListItemProps {
  /**
   * Title of the item
   */
  title: string
  /**
   * Description of the item
   */
  description: React.ReactNode
}

export const DescriptionListItem: React.FC<DescriptionListItemProps> = ({
  title,
  description,
}) => {
  return (
    <div className="border-t-mid-gray grid grid-cols-2 items-center gap-x-8 border-t py-2 first:border-t-0">
      <dt>
        <div className="text-dark-shades text-xs font-normal">{title}</div>
      </dt>
      <dd>
        <div className="text-gray max-w-xs text-xs font-light leading-6">
          {description}
        </div>
      </dd>
    </div>
  )
}
