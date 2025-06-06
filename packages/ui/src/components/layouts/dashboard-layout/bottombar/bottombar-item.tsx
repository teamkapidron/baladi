'use client';

import Link from 'next/link';
import { memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@repo/ui/lib/utils';

import type { LinkItem } from '../types';

function BottomBarItem(props: LinkItem) {
  const { title, icon, selectedIcon, href } = props;

  const pathname = usePathname();

  const isActive = useMemo(() => {
    return pathname.startsWith(href);
  }, [href, pathname]);

  const displayIcon = useMemo(() => {
    return isActive ? selectedIcon : icon;
  }, [isActive, selectedIcon, icon]);

  return (
    <Link
      href={href}
      className={cn(
        'flex flex-1 flex-col items-center justify-center space-y-1 px-2 py-2 font-[family-name:var(--font-dm-sans)] transition-colors',
        isActive
          ? 'text-[var(--color-gold-600)]'
          : 'text-gray-500 hover:text-[var(--color-gold-600)]',
      )}
      aria-label={`Navigate to ${title}`}
    >
      <span className="flex size-5 items-center justify-center">
        {displayIcon}
      </span>
      <span
        className={cn(
          'text-center text-xs font-medium',
          isActive ? 'text-[var(--color-gold-600)]' : 'text-gray-500',
        )}
      >
        {title}
      </span>
    </Link>
  );
}

export default memo(BottomBarItem);
