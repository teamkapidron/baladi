export interface LinkItem {
  href: string;
  title: string;
  label?: string;
  icon: React.ReactNode;
  selectedIcon?: React.ReactNode;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarLinks: LinkItem[];
  bottomBarLinks: LinkItem[];
}
