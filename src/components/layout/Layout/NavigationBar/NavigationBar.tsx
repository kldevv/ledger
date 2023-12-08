import { Root, List } from '@radix-ui/react-navigation-menu';
import * as NavItem from './NavItems';
import Link from 'next/link';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import { NavRoutes } from './NavRoutes';

export const NavigationBar: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightShades grow-0">
      <div className="px-6 gap-y-4 w-56 border-r overflow-y-auto h-full flex flex-col border-midGray">
        <div className="mt-4 flex shrink-0 h-8 items-center">
          <Link href="/">
            <PaperClipIcon className="w-8 h-8 text-main" />
          </Link>
        </div>

        <Root orientation={'vertical'} className="min-h-max">
          <List className="-mx-2 flex flex-col">
            <NavItem.WalletStatus />
            
            <NavItem.NavSubList
              title={'Ledger'}
              navRoutes={NavRoutes.Ledger}
              className="mt-2"
            />

            <NavItem.NavSubList
              title={'Settings'}
              navRoutes={NavRoutes.Settings}
              className="mt-7"
            />
          </List>
        </Root>

        <div className="mt-auto">
          <Link
            href="/profile"
            className="flex py-3 px-6 -mx-6 mt-1 hover:bg-midGray"
          >
            <div className="font-semibold leading-6 text-sm flex text-darkShades">
              Profile
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
