export function CustomerStatusTabs() {
  const activeTab = 'all' as 'all' | 'approved' | 'pending' | 'unverified';
  const setActiveTab = (
    tab: 'all' | 'approved' | 'pending' | 'unverified',
  ) => {};
  const pendingCount = 0;

  return (
    <div className="border-border no-scrollbar mt-5 flex gap-1 overflow-x-auto border-b">
      <button
        onClick={() => setActiveTab('all')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'all'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        All Customers
      </button>
      <button
        onClick={() => setActiveTab('approved')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'approved'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        Approved
      </button>
      <button
        onClick={() => setActiveTab('pending')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'pending'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        Pending Approval {pendingCount > 0 && `(${pendingCount})`}
      </button>
      <button
        onClick={() => setActiveTab('unverified')}
        className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'unverified'
            ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
            : 'text-muted-foreground hover:text-foreground border-transparent'
        }`}
      >
        Unverified Email
      </button>
    </div>
  );
}
