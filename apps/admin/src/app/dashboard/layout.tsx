import { useMemo } from 'react';

import DashboardLayout from '@repo/ui/components/layouts/dashboard-layout/dashboard-layout';
import {
  Home,
  Users,
  Layers,
  Package,
  HelpCircle,
  ShoppingCart,
} from '@repo/ui/lib/icons';

import type { LinkItem } from '@repo/ui/components/layouts/dashboard-layout/types';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout(props: AdminDashboardLayoutProps) {
  const { children } = props;

  const sidebarLinks = useMemo<LinkItem[]>(
    () => [
      {
        title: 'Home',
        href: '/dashboard',
        icon: <Home />,
      },
      {
        title: 'Products',
        href: '/dashboard/products',
        icon: <Package />,
      },
      {
        title: 'Orders',
        href: '/dashboard/orders',
        icon: <ShoppingCart />,
      },
      {
        title: 'Customers',
        href: '/dashboard/customers',
        icon: <Users />,
      },
      {
        title: 'Categories',
        href: '/dashboard/categories',
        icon: <Layers />,
      },
      {
        title: 'Help',
        href: '/dashboard/help',
        icon: <HelpCircle />,
      },
    ],
    [],
  );

  const bottomBarLinks = useMemo<LinkItem[]>(
    () => [
      {
        title: 'Home',
        href: '/dashboard',
        icon: <Home />,
      },
      {
        title: 'Products',
        href: '/dashboard/products',
        icon: <Package />,
      },
      {
        title: 'Orders',
        href: '/dashboard/orders',
        icon: <ShoppingCart />,
      },
      {
        title: 'Customers',
        href: '/dashboard/customers',
        icon: <Users />,
      },
    ],
    [],
  );

  return (
    <DashboardLayout
      sidebarLinks={sidebarLinks}
      bottomBarLinks={bottomBarLinks}
    >
      {children}
    </DashboardLayout>
  );
}
