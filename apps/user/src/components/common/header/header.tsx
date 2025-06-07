// Node Modules
import { memo } from 'react';

// Components
import LogoSection from './logo-section';
import SearchSection from './search-section';
import CartSection from './cart-section';
import ProfileSection from './profile-section';
import MobileMenuButton from './mobile-menu-button';

function Header() {
  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <header className="w-full">
        <div className="bg-white shadow-md">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between md:h-20">
              <LogoSection />
              <SearchSection />

              <div className="flex items-center space-x-5">
                <CartSection />
                <ProfileSection />
                <MobileMenuButton />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default memo(Header);
