import { memo } from 'react';

function AuthSidebar() {
  return (
    <div className="relative hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] lg:block lg:w-1/2">
      <div className="absolute inset-0 bg-[var(--color-secondary)] bg-[radial-gradient(circle,_var(--color-secondary)_1px,_transparent_1px)] bg-[length:20px_20px] opacity-30"></div>
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <div className="max-w-xl text-white">
          <div className="mb-8 flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <span className="text-2xl font-bold">Baladi</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            Admin Portal
          </h1>
          <p className="text-xl opacity-90">
            Manage your business with our powerful and intuitive admin
            dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(AuthSidebar);
