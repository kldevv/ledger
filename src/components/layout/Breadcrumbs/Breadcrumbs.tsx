import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { parseQueryValue, route } from '@/lib'

export const Breadcrumbs: React.FC = () => {
  const { pathname, query } = useRouter()

  const crumbs = useMemo(() => {
    const segments = pathname.split('/').filter((segment) => segment !== '')

    const includedQueries: Array<[string, string | string[] | undefined]> = []

    return segments.map((segment, index) => {
      const pathname = '/' + segments.slice(0, index + 1).join('/')

      const relevantQuery = Object.entries(query).find(
        ([key]) => `[${key}]` === segment,
      )

      if (relevantQuery) {
        includedQueries.push(relevantQuery)
      }

      const label =
        relevantQuery == null
          ? segment
              .split('-')
              .map((word) => word.at(0)?.toUpperCase() + word.slice(1))
              .join(' ')
          : parseQueryValue(relevantQuery.at(1))

      return {
        label,
        href: {
          pathname,
          query: Object.fromEntries(includedQueries),
        },
      }
    })
  }, [pathname, query])

  if (pathname === route.home.pathname) {
    return null
  }

  return (
    <div className="flex space-x-2 items-center h-6 flex-nowrap">
      <Link href={route.home.pathname}>
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
