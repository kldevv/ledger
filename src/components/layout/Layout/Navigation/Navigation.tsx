import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavItems } from './NavItems';
import Link from 'next/link';

/**
 * Persistent navigation
 */
export const Navigation: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-white">
      <div className="px-6 gap-y-5 border-r overflow-y-auto flex flex-col grow">
        <div className="flex shrink-0 h-16 items-center">
          <Link href="/">Brand</Link>
        </div>
        <NavigationMenu.Root>
          <NavigationMenu.List className="-mx-2">
            <NavItems />
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </div>
  );
};
