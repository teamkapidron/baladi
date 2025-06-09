'use client';

import { memo } from 'react';
import { User, Settings, LogOut } from '@repo/ui/lib/icons';
import Link from 'next/link';

function ProfileSidebar() {
  const userInitials = 'AB';
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };
  const memberSince = '2024-01-01';
  const activeTab: 'profile' | 'orders' | 'address' | 'wishlist' = 'profile';

  const handleLogout = () => {
    console.log('logout');
  };
  const isLoading = false;

  return (
    <div className="flex h-full flex-col">
      {/* User Profile Section */}
      <div className="flex flex-col items-center border-b border-gray-100 p-4 text-center sm:p-6">
        <div className="relative">
          <div className="from-primary-500 to-primary-600 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold text-white shadow-sm sm:h-24 sm:w-24 sm:text-2xl">
            {userInitials}
          </div>
          <button
            className="absolute bottom-0 right-0 rounded-full border border-gray-100 bg-white p-1 shadow-md sm:p-1.5"
            aria-label="Edit profile"
          >
            <Settings size={16} className="text-gray-600" />
          </button>
        </div>

        <h2 className="mt-3 text-base font-semibold text-gray-900 sm:mt-4 sm:text-lg">
          {user.name}
        </h2>
        <p className="text-xs text-gray-500 sm:text-sm">{user.email}</p>
        <div className="mt-2 rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-500 sm:px-3">
          Member since {memberSince}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-1 p-3 sm:p-4">
        <NavLink
          href="/profile?tab=profile"
          isActive={activeTab === 'profile'}
          icon={<User size={18} />}
          label="Min Profil"
        />
        {/* <NavLink
          href="/profile?tab=orders"
          isActive={activeTab === 'orders'}
          icon={<Package size={18} />}
          label="Bestillinger"
        />
        <NavLink
          href="/profile?tab=address"
          isActive={activeTab === 'address'}
          icon={<MapPin size={18} />}
          label="Lagrete Adresser"
        />
        <NavLink
          href="/profile?tab=wishlist"
          isActive={activeTab === 'wishlist'}
          icon={<Heart size={18} />}
          label="Ønskeliste"
        /> */}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto border-t border-gray-100 p-3 sm:p-4">
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 sm:px-4 sm:py-2.5 sm:text-sm"
        >
          {isLoading ? (
            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-red-600 border-t-transparent sm:h-4 sm:w-4"></span>
          ) : (
            <LogOut size={16} />
          )}
          Logg ut
        </button>
      </div>
    </div>
  );
}

export default memo(ProfileSidebar);

interface NavLinkProps {
  href: string;
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
}

const NavLink = memo((props: NavLinkProps) => {
  const { href, isActive, icon, label } = props;

  return (
    <Link
      href={href}
      className={`flex items-center rounded-lg px-3 py-2 transition-colors sm:px-4 sm:py-3 ${
        isActive
          ? 'bg-primary-50 text-primary-700 font-medium'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <span
        className={`mr-2 sm:mr-3 ${isActive ? 'text-primary-600' : 'text-gray-500'}`}
      >
        {icon}
      </span>
      <span className="text-sm sm:text-base">{label}</span>
      {isActive && (
        <span className="bg-primary-600 ml-auto h-4 w-1 rounded-full sm:h-6 sm:w-1.5"></span>
      )}
    </Link>
  );
});
