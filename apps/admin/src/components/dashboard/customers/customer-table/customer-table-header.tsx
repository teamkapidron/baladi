// Node Modules
import { memo } from 'react';

function CustomerTableHeader() {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-[var(--baladi-dark)]">
            Customers
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
            Manage your customer database
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomerTableHeader);
