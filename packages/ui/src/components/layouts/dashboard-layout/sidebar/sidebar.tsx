import { memo, useMemo } from 'react';

import { cn } from '@repo/ui/lib/utils';
import SidebarItem from './sidebar-item';

import type { LinkItem } from '../types';

interface SidebarProps {
  links: LinkItem[];
  className?: string;
  isCollapsed: boolean;
}

function Sidebar(props: SidebarProps) {
  const { className, links, isCollapsed } = props;

  const sidebarItems = useMemo(() => {
    return links.map((link) => (
      <SidebarItem key={link.href} link={link} isCollapsed={isCollapsed} />
    ));
  }, [links, isCollapsed]);

  return (
    <aside
      className={cn(
        'flex h-screen w-full flex-col',
        isCollapsed && 'items-center gap-y-3',
        className,
      )}
    >
      {sidebarItems}
    </aside>
  );
}

export default memo(Sidebar);
