import classNames from 'classnames'
import { useMemo } from 'react'

import { Link } from '..'

import type { UrlObject } from 'url'

export interface HeaderProps {
  /**
   * Header
   */
  header: string
  /**
   * A section of messages about what the page is about
   */
  section?: string | string[]
  /**
   * A link on the right side of the header
   */
  link?: {
    /**
     * Link href
     */
    href: string | UrlObject
    /**
     * Link label
     */
    label: string
  }
  /**
   * Override class name
   */
  className?: string
}

export const Header: React.FC<HeaderProps> = ({
  header,
  section,
  link,
  className,
}) => {
  const sections = useMemo(() => {
    if (section == null) return null

    if (Array.isArray(section)) {
      return section.map((s) => (
        <div
          className="text-gray mt-3 flex max-w-[40rem] flex-col space-y-2 text-sm"
          key={s}
        >
          <p>{s}</p>
        </div>
      ))
    }

    return <p className="text-gray mt-3 max-w-[40rem] text-base">{section}</p>
  }, [section])

  return (
    <div
      className={classNames('flex w-full items-center min-w-min', className)}
    >
      <div className="flex min-w-min flex-col">
        <h1 className="whitespace-nowrap text-3xl font-extrabold">{header}</h1>
        {sections}
      </div>
      {link && <Link {...link} className="ml-auto" />}
    </div>
  )
}
