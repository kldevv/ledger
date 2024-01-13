import {
  Root as ReactNavigatioMenuRoot,
  List as ReactNavigatioMenuList,
} from '@radix-ui/react-navigation-menu'
import { useTranslation } from 'next-i18next'

import * as NavItem from './NavItem'
import { NavRoutes } from './NavRoutes'

export const NavBar: React.FC = () => {
  const { t } = useTranslation('layout')

  return (
    <div className="flex flex-col bg-white grow-0">
      <div className="px-6 gap-y-4 w-56 border-r overflow-y-auto h-full flex flex-col border-mid-gray">
        <ReactNavigatioMenuRoot orientation={'vertical'} className="min-h-max">
          <ReactNavigatioMenuList className="-mx-2 flex flex-col">
            <NavItem.VaultStatus />

            <NavItem.NavSubList
              title={t('NavBar.label.main')}
              navRoutes={NavRoutes.Ledger}
              className="mt-2"
            />

            <NavItem.NavSubList
              title={t('NavBar.label.settings')}
              navRoutes={NavRoutes.Settings}
              className="mt-7"
            />
          </ReactNavigatioMenuList>
        </ReactNavigatioMenuRoot>
      </div>
    </div>
  )
}
