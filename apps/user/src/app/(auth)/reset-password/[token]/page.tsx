import Link from 'next/link';
import { Metadata } from 'next';
import { Lock } from '@repo/ui/lib/icons';
import ResetPasswordForm from '@/components/auth/reset-password/reset-password-form';

export const metadata: Metadata = {
  title: 'Reset Password | Baladi',
};

interface ResetPasswordPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function ResetPasswordPage(props: ResetPasswordPageProps) {
  const { token } = await props.params;

  return (
    <div className="flex w-full items-center justify-center bg-white p-8 md:p-10 lg:w-1/2">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="bg-[var(--baladi-primary)]/10 mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full text-[var(--baladi-primary)] lg:hidden">
            <Lock className="h-10 w-10" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Tilbakestill passordet ditt
          </h1>
          <p className="mb-8 text-gray-600">
            Lag et nytt sikkert passord for å få tilgang til Baladi-kontoen din
          </p>
        </div>

        <ResetPasswordForm token={token} />

        <div className="mt-8 text-center">
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              Husket passordet ditt?{' '}
              <Link
                href="/login"
                className="font-medium text-[var(--baladi-primary)] hover:text-[var(--baladi-primary-dark)]"
              >
                Tilbake til innlogging
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
