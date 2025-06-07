'use client';

// Node Modules
import Link from 'next/link';
import { User, LogIn } from '@repo/ui/lib/icons';
import { memo } from 'react';

function ProfileSection() {
  const capitalizeUserName = (name?: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // const displayName = user?.name ? capitalizeUserName(user.name) : 'Min Profil';

  // if (isAuthenticated) {
  //   return (
  //     <Link
  //       href="/profile"
  //       className="flex items-center gap-2 text-[var(--baladi-dark)] hover:text-[var(--baladi-primary)]"
  //       title={displayName}
  //     >
  //       <div className="hidden items-center gap-2 md:flex">
  //         <span className="text-sm font-medium">{displayName}</span>
  //       </div>
  //       <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--baladi-light)]">
  //         <User size={18} />
  //       </div>
  //     </Link>
  //   );
  // }

  return (
    <Link href="/login" className="flex items-center">
      <button className="flex h-10 items-center gap-2 rounded-md bg-[var(--baladi-primary)] px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-[var(--baladi-primary-dark)]">
        <LogIn size={16} />
        <span className="hidden sm:inline">Logg Inn</span>
      </button>
    </Link>
  );
}

export default memo(ProfileSection);
