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
    <nav className="flex items-center space-x-4">
      <div className="md:hidden">
        <span className="font-[family-name:var(--font-sora)] text-lg font-bold text-[var(--baladi-primary)]">
          {toTitleCase(tab || 'Home')}
        </span>
      </div>

      <div className="hidden h-16 items-center space-x-4 md:flex">
        <span className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-primary)]">
          {toTitleCase(tab || 'Home')}
        </span>
      </div>
    </nav>
  );
}

export default memo(Header);
