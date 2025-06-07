import Link from 'next/link';
import { Metadata } from 'next';
import { Lock } from '@repo/ui/lib/icons';
import SignupForm from '@/components/auth/signup/signup-form';

export const metadata: Metadata = {
  title: 'Signup | Baladi',
};

export default function SignupPage() {
  return (
    <div className="flex w-full items-center justify-center bg-white p-8 md:p-10 lg:w-1/2">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="bg-[var(--baladi-primary)]/10 mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full text-[var(--baladi-primary)] lg:hidden">
            <Lock className="h-10 w-10" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Opprett en ny konto
          </h1>
          <p className="mb-8 text-gray-600">
            Registrer deg for å få tilgang til vår engrosplattform
          </p>
        </div>

        <SignupForm />

        <div className="mt-8 text-center">
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              Har du allerede en konto?{' '}
              <Link
                href="/login"
                className="font-medium text-[var(--baladi-primary)] hover:text-[var(--baladi-primary-dark)]"
              >
                Logg inn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
