import classNames from 'classnames'

import { Breadcrumbs, NavMenu } from '..'
import { Footer, SideNav } from '../..'

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
    <div className="relative h-screen w-screen">
      <div className="absolute top-0 z-10 h-16 w-full bg-white">
        <NavMenu />
      </div>
      <div className="flex size-full pt-16">
        <SideNav className="w-52" />
        <div className="bg-light-shades size-full overflow-auto">
          <div className="size-full min-w-full">
            <main className="size-fit min-h-full w-[80vw] min-w-96">
              <div className="ml-6 mt-3 flex items-center">
                <Breadcrumbs />
              </div>
              <div
                className={classNames(
                  'px-16 pb-32',
                  'mt-3',
                  'flex flex-col gap-y-5',
                  'w-full ',
                )}
              >
                {children}
              </div>
            </main>
            <Footer className="bottom-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
