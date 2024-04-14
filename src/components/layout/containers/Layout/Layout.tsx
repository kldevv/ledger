import classNames from 'classnames'

import { Breadcrumbs, NavMenu } from '..'
import { Footer, SideNav } from '../../presentationals'

type LayoutProps = {
  /**
   * Children component
   */
  children: React.ReactNode
}

/**
 * Basic Page Layout
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen">
      <SideNav className="z-20 min-w-44 max-w-44" />
      <div className="bg-light-shades size-full min-w-96 overflow-scroll">
        <NavMenu />
        <div className="flex min-h-full min-w-full max-w-full flex-col px-16">
          <div className="mt-3">
            <Breadcrumbs />
          </div>
          <div
            className={classNames(
              'mt-3',
              'flex flex-col gap-y-5',
              'w-full h-full',
            )}
          >
            {children}
          </div>
          <Footer className="mt-auto" />
        </div>
      </div>
    </div>
  )
}
