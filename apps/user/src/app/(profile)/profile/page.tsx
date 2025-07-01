import { Suspense } from 'react';
import { Metadata } from 'next';

import Header from '@/components/common/header/header';
import ProfileContent from '@/components/profile/profile-content';
import Footer from '@/components/common/footer/footer';

export const metadata: Metadata = {
  title: 'Min profil | Baladi Engros',
};

export default function ProfilePage() {
  return (
    <Suspense>
      <div className="min-h-screen bg-[var(--baladi-background)]">
        <Header />

        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <ProfileContent />
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}
