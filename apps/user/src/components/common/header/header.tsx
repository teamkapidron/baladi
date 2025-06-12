// Node Modules
import { memo } from 'react';

// Components
import LogoSection from './logo-section';
import SearchSection from './search-section';
import CartSection from './cart-section';
import ProfileSection from './profile-section';

function Header() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-[var(--baladi-border)] bg-white/95 shadow-sm backdrop-blur-md">
      <header className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <div className="flex items-center">
              <LogoSection />
            </div>

            <div className="mx-8 hidden max-w-2xl flex-1 lg:flex">
              <SearchSection />
            </div>

            <div className="flex items-center space-x-4">
              <CartSection />
              <ProfileSection />
            </div>
          </div>

          <div className="border-t border-[var(--baladi-border)] py-3 lg:hidden">
            <SearchSection />
          </div>
        </div>
      </header>
    </div>
  );
}

export default memo(Header);
