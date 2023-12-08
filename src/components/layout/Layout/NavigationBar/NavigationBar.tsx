import { Root, List, Item, Sub } from '@radix-ui/react-navigation-menu';
import { NavLink } from './NavLink';
import Link from 'next/link';
import { ChartPieIcon, ClipboardDocumentListIcon, FolderOpenIcon, InboxStackIcon, ListBulletIcon, TableCellsIcon, TagIcon } from '@heroicons/react/24/outline';
import { PaperClipIcon, WalletIcon } from '@heroicons/react/20/solid';
import { useWalletContext } from '@/hooks';

/**
 * Navigation bar
 */
export const NavigationBar: React.FC = () => {
  const [{ currentWalletId, wallets }, ] = useWalletContext()

  return (
    <div className="flex flex-col bg-lightShades grow-0">
      <div className="px-6 gap-y-4 w-56 border-r overflow-y-auto h-full flex flex-col border-midGray">
        <div className="mt-4 flex shrink-0 h-8 items-center">
          <Link href="/">
            <PaperClipIcon className="w-8 h-8 text-main" />
          </Link>
        </div>

        <Link href="/wallet">
          <div className="flex gap-x-2 -mx-1 items-center font-semibold leading-6 text-xs hover:bg-main hover:text-lightShades border bg-lightShades text-main rounded-xl">
            <WalletIcon className="h-3 w-3 ml-2" />
            {wallets?.find((wallet) => wallet.id === currentWalletId)?.name}
          </div>
        </Link>

        <Root orientation={'vertical'} className="min-h-max">
          <List className="-mx-2 flex flex-col gap-y-7">
            <Item className="flex flex-col gap-y-1">
              <div className="leading-6 font-semibold text-xs text-darkMidGray">
                Ledger
              </div>
              <Sub>
                <List className="flex flex-col gap-y-1">
                  <Item>
                    <NavLink href="/transaction">
                      <div className="flex gap-x-2 items-center">
                        <ClipboardDocumentListIcon className="w-5 h-5" />
                        Transactions
                      </div>
                    </NavLink>
                  </Item>
                  <Item>
                    <NavLink href="/entry">
                      <div className="flex gap-x-2 items-center">
                        <ListBulletIcon className="w-5 h-5" />
                        Entries
                      </div>
                    </NavLink>
                  </Item>
                  <Item>
                    <NavLink href="/report">
                      <div className="flex gap-x-2 items-center">
                        <ChartPieIcon className="w-5 h-5" />
                        Reports
                      </div>
                    </NavLink>
                  </Item>
                  <Item>
                    <NavLink href="/document">
                      <div className="flex gap-x-2 items-center">
                        <TableCellsIcon className="w-5 h-5" />
                        Documents
                      </div>
                    </NavLink>
                  </Item>
                </List>
              </Sub>
            </Item>

            <Item className="flex flex-col gap-y-1">
              <div className="leading-6 font-semibold text-xs text-darkMidGray">
                Tools
              </div>
              <Sub>
                <List className="flex flex-col gap-y-1">
                  <Item>
                    <NavLink href="/account">
                      <div className="flex gap-x-2 items-center">
                        <InboxStackIcon className="w-5 h-5" />
                        Accounts
                      </div>
                    </NavLink>
                  </Item>
                  <Item>
                    <NavLink href="/category">
                      <div className="flex gap-x-2 items-center">
                        <FolderOpenIcon className="w-5 h-5" />
                        Categories
                      </div>
                    </NavLink>
                  </Item>
                  <Item>
                    <NavLink href="/tag">
                      <div className="flex gap-x-2 items-center">
                        <TagIcon className="w-5 h-5" />
                        Tags
                      </div>
                    </NavLink>
                  </Item>
                </List>
              </Sub>
            </Item>
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
