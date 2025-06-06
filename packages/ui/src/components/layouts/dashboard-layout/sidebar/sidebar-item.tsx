import Link from 'next/link';
import { memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@repo/ui/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components/base/tooltip';
import { buttonVariants } from '@repo/ui/components/base/button';

import type { LinkItem } from '../types';

interface SidebarItemProps {
  isCollapsed: boolean;
  link: LinkItem;
}

function SidebarItem(props: SidebarItemProps) {
  const { isCollapsed, link } = props;

  const pathname = usePathname();

  const isActive = useMemo(() => {
    return pathname.startsWith(link.href);
  }, [link.href, pathname]);

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href={link.href}
            className={cn(
              buttonVariants({
                variant: isActive ? 'default' : 'ghost',
                size: 'icon',
              }),
              'size-10',
              isActive && 'bg-primary hover:bg-primary/80',
            )}
          >
            {link.icon}
            <span className="sr-only">{link.title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {link.title}
          {link.label && (
            <span className="text-muted-foreground ml-auto">{link.label}</span>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link
      href={link.href}
      className={cn(
        buttonVariants({
          variant: isActive ? 'default' : 'ghost',
          size: 'sm',
        }),
        'mx-3 my-2 rounded-xl py-5',
        isActive && 'bg-primary hover:bg-primary/80',
        'justify-start',
        'text-muted-foreground',
        isActive && 'text-white',
      )}
    >
      {link.icon}
      <span className={cn('ml-3 text-base')}>{link.title}</span>
      {link.label && (
        <span className={cn('ml-auto', isActive && 'text-background')}>
          {link.label}
        </span>
      )}
    </Link>
  );
}

export default memo(SidebarItem);
