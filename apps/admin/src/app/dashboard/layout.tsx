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
        title: 'Newsletter',
        href: '/dashboard/newsletter',
        icon: 'mail',
      },
      {
        title: 'Promotions',
        href: '/dashboard/promotion',
        icon: 'tag',
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
      sidebarSlice={5}
    >
      {children}
    </DashboardLayout>
  );
}
