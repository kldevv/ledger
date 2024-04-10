import {
  SideNavItem,
  type SideNavItemProps,
} from '../SideNav.Item/SideNav.Item'

export interface SideNavSectionProps {
  /**
   * Section title, no title if undefined
   */
  title?: string
  /**
   * Section items
   */
  items: SideNavItemProps[]
}

export const SideNavSection: React.FC<SideNavSectionProps> = ({
  title,
  items,
}) => {
  return (
    <div className="flex flex-col">
      {title != null && (
        <h3 className="text-gray mb-2 ml-2 select-none text-xs font-medium">
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-y-2">
        {items.map((props) => (
          <SideNavItem {...props} key={props.label} />
        ))}
      </div>
    </div>
  )
}
