import classNames from 'classnames'

import {
  BackLink,
  SideNavigationBar,
  TopNavigationBar,
} from '@/components/layout'

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
    <div className="h-screen relative w-screen">
      <div className="w-full absolute top-0 h-16 z-10 bg-white">
        <TopNavigationBar />
      </div>
      <div className="flex w-full h-full pt-16">
        <div className="h-full w-56 z-5 border-left overflow-hidden bg-white">
          <SideNavigationBar />
        </div>
        <main className="w-full h-full overflow-auto bg-light-shades">
          <div
            className={classNames(
              'px-16',
              prev != null ? 'mt-5' : 'mt-14',
              'pb-32',
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
