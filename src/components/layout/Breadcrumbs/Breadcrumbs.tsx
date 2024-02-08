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
    <div className="flex h-6 flex-nowrap items-center space-x-2">
      <Link
        href={route.home.pathname}
        className="hover:text-light-accent text-gray "
      >
        <HomeIcon className="size-3" />
      </Link>
      {crumbs.map(({ label, href }) => {
        return (
          <React.Fragment key={label}>
            <ChevronRightIcon className="text-gray size-3" />
            <Link href={href} className="text-gray hover:text-light-accent">
              <span className="whitespace-nowrap text-xs font-medium leading-6">
                {label}
              </span>
            </Link>
          </React.Fragment>
        )
      })}
    </div>
  )
}
