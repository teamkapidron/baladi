import Link from 'next/link';
import { Metadata } from 'next';
import { Lock } from '@repo/ui/lib/icons';
import LoginForm from '@/components/auth/login/login-form';

export const metadata: Metadata = {
  title: 'Login | Baladi',
};

export default function LoginPage() {
  return (
    <div className="flex w-full items-center justify-center bg-white p-8 md:p-10 lg:w-1/2">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="bg-[var(--baladi-primary)]/10 mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full text-[var(--baladi-primary)] lg:hidden">
            <Lock className="h-10 w-10" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Logg inn på kontoen din
          </h1>
          <p className="mb-8 text-gray-600">
            Skriv inn påloggingsinformasjonen for å få tilgang til
            Baladi-dashbordet ditt
          </p>
        </div>

        <LoginForm />

        <div className="mt-8 text-center">
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              Har du ikke en konto?{' '}
              <Link
                href="/register"
                className="font-medium text-[var(--baladi-primary)] hover:text-[var(--baladi-primary-dark)]"
              >
                Opprett en konto
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
