import Link from 'next/link';

import { Item, Link as MenuLink} from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';

export type WalletLinkProps = {
  /**
   * Is active
   */
  active?: boolean;
  /**
   * Is loading
   */
  loading?: boolean;
  /**
   * Is error
   */
  error?: boolean;
  /**
   * Wallet route
   */
  route: string
  /**
   * Children component
   */
  children: React.ReactNode
};

export const WalletLink: React.FC<WalletLinkProps> = ({ active = false, loading = false, error = false, children }) => {
  const cn = classNames(
    'mx-1',
    'flex gap-x-2 items-center',
    'font-semibold leading-6 text-xs text-main',
    'border rounded-xl bg-lightShades',
    // Hover
    'hover:bg-main hover:text-lightShades',
    // Active
    'data-[active]:bg-main data-[active]:text-lightShades'
  );

  return (
    <Item>
      <Link href={'/wallet'} passHref legacyBehavior>
        <MenuLink active={active} className={cn}>
          {children}
        </MenuLink>
      </Link>
    </Item>
  );
};
