import { Root as ReactNavigatioMenuRoot } from '@radix-ui/react-navigation-menu'

import { SideNavigationBarMenu } from '..'

import { navigatorGroups } from './items'

export const SideNavigationBar: React.FC = () => {
  return (
    <div className="w-full h-full border-r border-r-mid-gray shadow-sm px-4 pt-3">
      <ReactNavigatioMenuRoot orientation={'vertical'}>
        <SideNavigationBarMenu groups={navigatorGroups} />
      </ReactNavigatioMenuRoot>
    </div>
  )
}
