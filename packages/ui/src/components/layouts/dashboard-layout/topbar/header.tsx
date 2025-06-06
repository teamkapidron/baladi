'use client';

import { memo, useCallback } from 'react';
import { usePathname } from 'next/navigation';

function Header() {
  const pathname = usePathname();
  const tab = pathname.split('/').pop();

  const toTitleCase = useCallback((str: string) => {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, []);

  return (
    <nav className="bg-background text-foreground flex items-center space-x-4">
      <div className="md:hidden">
        <span className="text-primary text-xl font-semibold">
          {toTitleCase(tab || 'Home')}
        </span>
      </div>

      <div className="hidden items-center space-x-4 md:flex">
        <span className="text-primary text-xl font-semibold">
          {toTitleCase(tab || 'Home')}
        </span>
      </div>
    </nav>
  );
}

export default memo(Header);
