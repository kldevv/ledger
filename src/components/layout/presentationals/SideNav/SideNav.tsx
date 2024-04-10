import classNames from 'classnames'

import { useSideNavSection } from '../../hooks/useSideNavSection/useSideNavSection'

import { SideNavSection } from './SideNav.Section/SideNav.Section'

export interface SideNavProps {
  /**
   * Override class name
   */
  className?: string
}

export const SideNav: React.FC<SideNavProps> = ({ className }) => {
  const section = useSideNavSection()

  return (
    <div
      className={classNames(
        'border-r-mid-gray flex size-full flex-col gap-y-6 overflow-y-auto border-r px-2 py-4 max-w-52',
        className,
      )}
    >
      {section.map(({ title, items, id }) => (
        <SideNavSection items={items} title={title} key={id} />
      ))}
    </div>
  )
}
