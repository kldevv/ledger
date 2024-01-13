import { Root as ReactNavigatioMenuRoot } from '@radix-ui/react-navigation-menu'

import { SideNavigationBarMenu } from '..'

import { navigatorGroups } from './items'

export const SideNavigationBar: React.FC = () => {
  return (
    <div className="w-full h-full border-r border-r-mid-gray shadow-sm">
      <ReactNavigatioMenuRoot orientation={'vertical'}>
        <SideNavigationBarMenu groups={navigatorGroups} />
      </ReactNavigatioMenuRoot>
    </div>
  )
}
