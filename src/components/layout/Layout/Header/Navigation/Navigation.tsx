import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavItems } from './NavItems';

/**
 * Persistent navigation
 */
export const Navigation: React.FC = () => {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavItems />
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
};
