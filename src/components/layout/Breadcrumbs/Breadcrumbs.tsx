import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export const Breadcrumbs: React.FC = () => {
  const { pathname, query } = useRouter()

  const crumbs = useMemo(() => {
    const segments = pathname.split('/').filter((segment) => segment !== '')

    return segments.map((segment, index) => {
      const pathname = '/' + segments.slice(0, index + 1).join('/')

      const queryValue = Object.entries(query)
        .find(([key]) => `[${key}]` === segment)
        ?.at(1)

      const label =
        queryValue == null
          ? segment
              .split('-')
              .map((word) => word.at(0)?.toUpperCase() + word.slice(1))
              .join(' ')
          : Array.isArray(queryValue)
            ? queryValue.at(0)
            : queryValue

      return {
        label,
        href: {
          pathname,
          query,
        },
      }
    })
  }, [pathname, query])

  return (
    <div className="flex space-x-2 items-center">
      <Link href={'/'}>
        <HomeIcon className="w-3 h-3 text-gray hover:text-light-accent" />
      </Link>
      {crumbs.map(({ label, href }) => {
        return (
          <React.Fragment key={label}>
            <ChevronRightIcon className="w-3 h-3 text-gray" />
            <Link href={href}>
              <span className="leading-6 text-xs text-gray font-medium whitespace-nowrap hover:text-light-accent">
                {label}
              </span>
            </Link>
          </React.Fragment>
        )
      })}
    </div>
  )
}
