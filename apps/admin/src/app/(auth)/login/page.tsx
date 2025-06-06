import LoginForm from '@/components/auth/login/login-form';

export default function Login() {
  return (
    <div className="flex w-full items-center justify-center bg-[var(--color-background-light)] p-8 sm:p-12 lg:w-1/2 dark:bg-[var(--color-primary)]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-center text-3xl font-bold tracking-tight text-[var(--color-text)] dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-[var(--color-gray)] dark:text-gray-400">
            Sign in to access your admin dashboard
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-gray)] border-opacity-20 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-[var(--color-secondary)]">
          <LoginForm />
        </div>

        <div className="mt-6 text-center text-xs text-[var(--color-gray)] dark:text-gray-400">
          © {new Date().getFullYear()} Baladi. All rights reserved.
        </div>
      </div>
    </div>
  );
}
