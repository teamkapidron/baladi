import { Metadata } from 'next';
import { Building2, Sparkles } from '@repo/ui/lib/icons';
import OnboardingForm from '@/components/auth/onboarding/onboarding-form';

export const metadata: Metadata = {
  title: 'Fullfør registrering | Baladi',
};

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--baladi-light)] p-8 sm:p-12 lg:w-1/2">
      <div className="w-full max-w-lg">
        <div className="mb-10 text-center">
          <div className="mb-8">
            <div className="relative inline-flex items-center justify-center">
              <div className="bg-[var(--baladi-primary)]/20 absolute inset-0 animate-pulse rounded-full blur-2xl"></div>
              <div className="from-[var(--baladi-primary)]/10 to-[var(--baladi-secondary)]/10 absolute -inset-4 rounded-full bg-gradient-to-r blur-xl"></div>
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)] shadow-lg">
                <Building2 className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="mt-6 font-[family-name:var(--font-sora)] text-4xl font-bold tracking-tight text-[var(--baladi-dark)]">
              Fullfør registreringen
            </h2>
            <div className="mt-3 flex items-center justify-center">
              <div className="h-1 w-16 rounded-full bg-[var(--baladi-primary)]"></div>
            </div>
          </div>
          <p className="font-[family-name:var(--font-dm-sans)] text-lg text-[var(--baladi-gray)]">
            Vi trenger litt mer informasjon om bedriften din
          </p>
        </div>

        <div className="relative">
          <div className="bg-[var(--baladi-accent)]/30 absolute -left-2 -top-2 h-4 w-4 rounded-full blur-sm"></div>
          <div className="bg-[var(--baladi-secondary)]/20 absolute -bottom-2 -right-2 h-6 w-6 rounded-full blur-sm"></div>

          <div className="rounded-2xl border border-[var(--baladi-border)] bg-white p-8 shadow-lg backdrop-blur-sm">
            <div className="mb-8 text-center">
              <div className="mb-4 flex items-center justify-center space-x-2">
                <Sparkles className="h-5 w-5 text-[var(--baladi-accent)]" />
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
                  Bedriftsinformasjon
                </h3>
                <Sparkles className="h-5 w-5 text-[var(--baladi-accent)]" />
              </div>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                Oppgi nøyaktig informasjon for rask godkjenning
              </p>
            </div>

            <OnboardingForm />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-8 rounded-full bg-[var(--baladi-success)]"></div>
            <div className="h-2 w-8 rounded-full bg-[var(--baladi-primary)]"></div>
            <div className="h-2 w-8 rounded-full bg-[var(--baladi-border)]"></div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-1 text-xs text-[var(--baladi-gray)]">
            <span className="font-[family-name:var(--font-dm-sans)]">
              © {new Date().getFullYear()}
            </span>
            <span className="font-[family-name:var(--font-sora)] font-semibold text-[var(--baladi-primary)]">
              Baladi Engros
            </span>
            <span className="font-[family-name:var(--font-dm-sans)]">
              • Alle rettigheter forbeholdt
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
