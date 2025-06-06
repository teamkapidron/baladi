import Image from 'next/image';
import { memo, useEffect, useState } from 'react';

import { cn } from '@repo/ui/lib/utils';
import { useMediaQuery } from '@repo/ui/hooks/useMediaQuery';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@repo/ui/components/base/resizable';

import TopBar from './topbar/topbar';
import Sidebar from './sidebar/sidebar';

import type { LinkItem } from './types';

interface DesktopLayoutProps {
  sidebarSlice: number;
  sidebarLinks: LinkItem[];
  children: React.ReactNode;
}

function DesktopLayout(props: DesktopLayoutProps) {
  const { children, sidebarLinks, sidebarSlice } = props;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1260px)');

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="fixed h-full max-h-screen min-h-screen items-stretch"
    >
      <ResizablePanel
        defaultSize={88.2}
        collapsedSize={5}
        collapsible={isMobile ? false : true}
        minSize={isMobile ? 5 : 15}
        maxSize={isMobile ? 5 : 15}
        onCollapse={() => {
          setIsCollapsed(true);
        }}
        onResize={() => {
          setIsCollapsed(false);
        }}
        className={cn(
          isCollapsed &&
            'h-screen min-w-[50px] transition-all duration-300 ease-in-out',
        )}
      >
        <div
          className={cn(
            'mb-7 mt-3 flex h-[52px] items-center justify-center',
            isCollapsed ? '' : 'px-2',
          )}
        >
          {!isCollapsed && (
            <div className="flex items-center justify-center gap-2">
              <Image
                alt="Baladi"
                height={0}
                width={144}
                className="w-12"
                src="/images/brand/logo.png"
              />
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold">Baladi</span>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="flex size-12 items-center justify-center rounded-md bg-neutral-100 p-2">
              <Image
                alt="Flavoury"
                height={0}
                width={144}
                className="w-full"
                src="/images/brand/logo.png"
              />
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col items-center justify-between">
          <Sidebar
            isCollapsed={isCollapsed}
            links={sidebarLinks.slice(0, sidebarSlice)}
          />
          <div className="mx-4 my-5 border-t border-[#929aa9]" />
          <Sidebar
            isCollapsed={isCollapsed}
            links={sidebarLinks.slice(sidebarSlice)}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={500}>
        <div className="flex h-screen flex-col">
          <TopBar />
          <div className="bg-background flex-grow overflow-y-auto">
            {children}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default memo(DesktopLayout);
