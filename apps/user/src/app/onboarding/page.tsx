import { Metadata } from 'next';
import OnboardingForm from '@/components/onboarding/onboarding-form';

export const metadata: Metadata = {
  title: 'Onboarding | Baladi',
};

export default function OnboardingPage() {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="h-screen w-full overflow-y-auto md:w-1/2">
        <div className="w-full overflow-y-auto bg-white p-8 md:p-12">
          <div className="mx-auto w-full max-w-md">
            <h2 className="mb-2 text-3xl font-bold text-[var(--baladi-dark)]">
              Registrer informasjon
            </h2>
            <p className="mb-2 text-[var(--baladi-muted-foreground)]">
              Vennligst fyll ut all nødvendig informasjon nedenfor
            </p>
            <p className="mb-6 text-sm text-[var(--baladi-primary)]">
              * Alle felt er påkrevd
            </p>

            <OnboardingForm />
          </div>
        </div>
      </div>
    </div>
  );
}
