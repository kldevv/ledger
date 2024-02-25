import { Root as ReactNavigatioMenuRoot } from '@radix-ui/react-navigation-menu'

import { SideNavigationBarMenu } from '..'

import { navigatorGroups } from './items'

export const SideNavigationBar: React.FC = () => {
  return (
    <div className="border-r-mid-gray size-full overflow-y-auto border-r px-2 pb-12 pt-3 shadow-sm">
      <ReactNavigatioMenuRoot orientation={'vertical'}>
        <SideNavigationBarMenu groups={navigatorGroups} />
      </ReactNavigatioMenuRoot>
    </div>
  )
}
