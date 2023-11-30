import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavItems } from './NavItems';
import Link from 'next/link';

/**
 * Persistent navigation
 */
export const Navigation: React.FC = () => {
  return (
    <div className="flex flex-col w-72">
      <div className="px-6">
        <div>
          <Link
            className="flex-none text-xl font-semibold dark:text-white"
            href="#"
            aria-label="Brand"
          >
            Brand
          </Link>
        </div>
        <NavigationMenu.Root>
          <NavigationMenu.List className="p-6 w-full flex flex-col flex-wrap">
            <NavItems />
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </div>
  );
};
