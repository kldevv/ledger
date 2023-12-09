import React from 'react';

import {
  ChartPieIcon,
  ClipboardDocumentListIcon,
  FolderOpenIcon,
  InboxStackIcon,
  ListBulletIcon,
  TableCellsIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

const iconClassNames = 'w-5 h-5';

export type NavRoute = {
  /**
   * Route
   */
  route: string;
  /**
   * Route icon
   */
  icon?: React.ReactNode;
}

const Ledger: NavRoute[] = [
  {
    route: '/transaction',
    icon: <ClipboardDocumentListIcon className={iconClassNames} />,
  },
  {
    route: '/entry',
    icon: <ListBulletIcon className={iconClassNames} />,
  },
  {
    route: '/report',
    icon: <ChartPieIcon className={iconClassNames} />,
  },
  {
    route: '/document',
    icon: <TableCellsIcon className={iconClassNames} />,
  },
];

const Settings: NavRoute[] = [
  {
    route: '/account',
    icon: <InboxStackIcon className={iconClassNames} />,
  },
  {
    route: '/category',
    icon: <FolderOpenIcon className={iconClassNames} />,
  },
  {
    route: '/tag',
    icon: <TagIcon className={iconClassNames} />,
  },
];

export const NavRoutes = {
  Ledger,
  Settings,
};
