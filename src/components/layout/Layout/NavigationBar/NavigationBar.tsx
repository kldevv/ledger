import { Root, List, Item, Sub } from '@radix-ui/react-navigation-menu';
import { NavLink } from './NavLink';
import Link from 'next/link';

/**
 * Navigation bar
 */
export const NavigationBar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-lightgray">
      <div className="px-6 gap-y-5 border-r overflow-y-auto flex flex-col grow border-midgray">
        <div className="flex shrink-0 h-8 items-center">
          <Link href="/">Brand</Link>
        </div>

        <Root orientation={'vertical'} className="min-h-max">
          <List className="-mx-2 flex flex-col gap-y-7">
            <Item className="flex flex-col gap-y-1">
              <div className="leading-6 font-semibold text-xs text-darkmidgray">
                Ledger
              </div>
              <Sub>
                <List className="flex flex-col gap-y-1">
                  <Item>
                    <NavLink href="/transaction">Transactions</NavLink>
                  </Item>
                  <Item>
                    <NavLink href="/entry">Entries</NavLink>
                  </Item>
                  <Item>
                    <NavLink href="/report">Reports</NavLink>
                  </Item>
                  <Item>
                    <NavLink href="/statement">Documents</NavLink>
                  </Item>
                </List>
              </Sub>
            </Item>

            <Item className="flex flex-col gap-y-1">
              <div className="leading-6 font-semibold text-xs text-darkmidgray">
                Settings
              </div>
              <Sub>
                <List className="flex flex-col gap-y-1">
                  <Item>
                    <NavLink href="/wallet">Wallets</NavLink>
                  </Item>
                  <Item>
                    <NavLink href="/account">Accounts</NavLink>
                  </Item>
                  <Item>
                    <NavLink href="/category">Categories</NavLink>
                  </Item>
                  <Item>
                    <NavLink href="/tag">Tags</NavLink>
                  </Item>
                </List>
              </Sub>
            </Item>
          </List>
        </Root>
      </div>

      <div className="mt-auto">
        <Link href="/" className="flex py-3 px-6 hover:bg-midgray">
          Profile
        </Link>
      </div>
    </div>
  );
};
