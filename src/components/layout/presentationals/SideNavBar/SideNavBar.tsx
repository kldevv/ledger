import classNames from 'classnames'

import { useSideNavSection } from '../../hooks/useSideNavSection/useSideNavSection'

import { Section } from './SideNavBar.Section/Section'

export interface SideNavBarProps {
  /**
   * Override class name
   */
  className?: string
}

export const SideNavBar: React.FC<SideNavBarProps> = ({ className }) => {
  const section = useSideNavSection()

  return (
    <div
      className={classNames(
        'border-r-mid-gray flex size-full flex-col space-y-6 overflow-y-auto border-r px-2 py-4',
        className,
      )}
    >
      {section.map(({ title, items }) => {
        return <Section items={items} title={title} key={title} />
      })}
    </div>
  )
}
