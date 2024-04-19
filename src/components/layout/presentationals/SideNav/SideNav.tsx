import classNames from 'classnames'
import Link from 'next/link'

import { Icon } from '@/components/core/presentationals'
import { route } from '@/shared/route'

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
        'border-r-mid-gray flex size-full flex-col border-r px-2 py-4 max-w-52',
        className,
      )}
    >
      <div className="mb-4 ml-4 mt-2 flex">
        <Link
          href={route.core.home}
          className="text-dark-shades flex items-center text-xl font-extrabold leading-4"
        >
          Pizzafund <Icon.Solid name="Hashtag" />
        </Link>
      </div>
      <div className="flex size-full flex-col gap-y-6 overflow-y-auto">
        {section.map(({ title, items, id }) => (
          <SideNavSection items={items} title={title} key={id} />
        ))}
      </div>
    </div>
  )
}
