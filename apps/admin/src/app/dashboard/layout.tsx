import { useMemo } from 'react';
import DashboardLayout from '@/components/layouts/dashboard-layout/dashboard-layout';

import type { LinkItem } from '@/components/layouts/dashboard-layout/types';

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
        icon: 'home',
      },
      {
        title: 'Products',
        href: '/dashboard/products',
        icon: 'package',
      },
      {
        title: 'Categories',
        href: '/dashboard/categories',
        icon: 'tag',
      },
      {
        title: 'Inventory',
        href: '/dashboard/inventory',
        icon: 'boxes',
      },
      {
        title: 'Orders',
        href: '/dashboard/orders',
        icon: 'shopping-cart',
      },
      {
        title: 'Customers',
        href: '/dashboard/customers',
        icon: 'users',
      },
      {
        title: 'Discounts',
        href: '/dashboard/discounts',
        icon: 'percent',
      },
      {
        title: 'Newsletter',
        href: '/dashboard/newsletter',
        icon: 'mail',
      },
      {
        title: 'Promotions',
        href: '/dashboard/promotion',
        icon: 'badge-percent',
      },
      {
        title: 'Settings',
        href: '/dashboard/settings',
        icon: 'settings',
      },
    ],
    [],
  );

  const bottomBarLinks = useMemo<LinkItem[]>(
    () => [
      {
        title: 'Home',
        href: '/dashboard',
        icon: 'home',
      },
      {
        title: 'Products',
        href: '/dashboard/products',
        icon: 'package',
      },
      {
        title: 'Orders',
        href: '/dashboard/orders',
        icon: 'shopping-cart',
      },
      {
        title: 'Customers',
        href: '/dashboard/customers',
        icon: 'users',
      },
    ],
    [],
  );

  return (
    <DashboardLayout
      sidebarLinks={sidebarLinks}
      bottomBarLinks={bottomBarLinks}
      sidebarSlice={7}
    >
      {children}
    </DashboardLayout>
  );
}
