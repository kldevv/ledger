import { useSideNavSection } from '../../hooks/useSideNavSection'

import { Section } from './SideNavBar.Section/Section'

export const SideNavBar: React.FC = () => {
  const section = useSideNavSection()

  return (
    <div className="border-r-mid-gray flex size-full flex-col space-y-3 overflow-y-auto border-r px-2 py-4">
      {section.map(({ title, items }) => {
        return <Section items={items} title={title} key={title} />
      })}
    </div>
  )
}
