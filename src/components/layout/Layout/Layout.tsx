import classNames from 'classnames'

import { NavBar, BackLink } from '@/components/layout'

import type { UrlObject } from 'url'

type LayoutProps = {
  /**
   * Route to go back to
   */
  prev?: string | UrlObject
  /**
   * Children component
   */
  children: React.ReactNode
}

/**
 * Basic Page Layout
 */
export const Layout: React.FC<LayoutProps> = ({ children, prev }) => {
  return (
    <div className="min-h-screen flex relative min-w-full">
      <div className="absolute top-0 w-full h-12 bg-white shadow-sm border-b border-mid-gray">
        Hello
      </div>
      <div className="flex w-full pt-12">
        <NavBar />
        <main className="w-full max-h-screen overflow-auto bg-light-shades">
          <div
            className={classNames(
              'mx-16',
              prev != null ? 'mt-5' : 'mt-14',
              'mb-32',
              'flex flex-col gap-y-5',
              'min-w-min',
            )}
          >
            {prev != null && <BackLink href={prev} />}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
