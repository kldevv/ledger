import { Root, List } from '@radix-ui/react-navigation-menu';
import * as NavItem from './NavItem';
import Link from 'next/link';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import { NavRoutes } from './NavRoutes';
import { useTranslation } from 'next-i18next';

export const NavBar: React.FC = () => {
  const { t } = useTranslation('layout')

  return (
    <div className="flex flex-col bg-white grow-0">
      <div className="px-6 gap-y-4 w-56 border-r overflow-y-auto h-full flex flex-col border-mid-gray">
        <div className="mt-4 flex shrink-0 h-8 items-center">
          <Link href="/">
            <PaperClipIcon className="w-8 h-8 text-main" />
          </Link>
        </div>

        <Root orientation={'vertical'} className="min-h-max">
          <List className="-mx-2 flex flex-col">
            <NavItem.VaultStatus />

            <NavItem.NavSubList
              title={t('nav-bar.label.main')}
              navRoutes={NavRoutes.Ledger}
              className="mt-2"
            />

            <NavItem.NavSubList
              title={t('nav-bar.label.settings')}
              navRoutes={NavRoutes.Settings}
              className="mt-7"
            />
          </List>
        </Root>

        <div className="mt-auto">
          <Link
            href="/profile"
            className="flex py-3 px-6 -mx-6 mt-1 hover:bg-mid-gray"
          >
            <div className="font-semibold leading-6 text-sm flex text-dark-shades">
              Profile
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
