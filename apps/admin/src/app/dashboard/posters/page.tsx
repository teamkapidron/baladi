'use client';

// Node Modules
import { memo } from 'react';

// Components
import PosterBody from '@/components/dashboard/posters/poster-body';

function PostersPage() {
  return (
    <div className="space-y-6">
      <PosterBody />
    </div>
  );
}

export default memo(PostersPage);
