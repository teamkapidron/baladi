import { memo } from 'react';
import Header from './header';

function TopBar() {
  return (
    <div className="flex items-center justify-between border-b border-[#e2e8f0] bg-white px-5 py-3">
      <div className="text-2xl font-bold text-[#116DE3]">
        <Header />
      </div>
    </div>
  );
}

export default memo(TopBar);
