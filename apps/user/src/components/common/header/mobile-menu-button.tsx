'use client';

// Node Modules
import { memo, useCallback, useRef, useState } from 'react';
import { Menu } from '@repo/ui/lib/icons';

function MobileMenuButton() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, [mobileMenuOpen]);

  return (
    <button
      ref={mobileMenuButtonRef}
      title="Meny"
      className="text-[var(--baladi-dark)] hover:text-[var(--baladi-primary)] lg:hidden"
      onClick={handleClick}
    >
      <Menu size={24} />
    </button>
  );
}

export default memo(MobileMenuButton);
