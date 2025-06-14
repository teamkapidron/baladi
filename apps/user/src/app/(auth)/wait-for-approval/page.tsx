import { Metadata } from 'next';
import {
  Clock,
  Shield,
  UserCheck,
  Mail,
  CheckCircle,
} from '@repo/ui/lib/icons';

export const metadata: Metadata = {
  title: 'Venter på godkjenning',
};

export default function WaitForApprovalPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[var(--baladi-light)] p-8 sm:p-12 lg:w-1/2">
      <div className="w-full max-w-lg">
        <div className="mb-10 text-center">
          <div className="mb-8">
            <div className="relative inline-flex items-center justify-center">
              <div className="bg-[var(--baladi-primary)]/20 absolute inset-0 animate-pulse rounded-full blur-2xl"></div>
              <div className="from-[var(--baladi-primary)]/10 to-[var(--baladi-secondary)]/10 absolute -inset-4 rounded-full bg-gradient-to-r blur-xl"></div>
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)] shadow-lg">
                <Clock className="h-10 w-10 animate-pulse text-white" />
              </div>
            </div>
            <h2 className="mt-6 font-[family-name:var(--font-sora)] text-4xl font-bold tracking-tight text-[var(--baladi-dark)]">
              Venter på godkjenning
            </h2>
            <div className="mt-3 flex items-center justify-center">
              <div className="h-1 w-16 rounded-full bg-[var(--baladi-primary)]"></div>
            </div>
          </div>
          <p className="font-[family-name:var(--font-dm-sans)] text-lg text-[var(--baladi-gray)]">
            Takk for at du registrerte deg hos Baladi Engros
          </p>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-[var(--baladi-border)] bg-white p-8 shadow-lg">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="mb-3 font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
                  Din søknad er under behandling
                </h3>
                <p className="font-[family-name:var(--font-dm-sans)] leading-relaxed text-[var(--baladi-gray)]">
                  Vi gjennomgår for øyeblikket din registrering og verifiserer
                  bedriftsinformasjonen din. Dette tar vanligvis 1-2 virkedager.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-[var(--baladi-success)]/10 flex items-center space-x-4 rounded-lg p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--baladi-success)] shadow-sm">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Registrering fullført
                    </p>
                    <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                      Din konto er opprettet
                    </p>
                  </div>
                </div>

                <div className="bg-[var(--baladi-info)]/10 flex items-center space-x-4 rounded-lg p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--baladi-info)] shadow-sm">
                    <Shield className="h-4 w-4 animate-pulse text-white" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Verifisering pågår
                    </p>
                    <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                      Vi sjekker bedriftsinformasjonen din
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rounded-lg bg-[var(--baladi-muted)] p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--baladi-gray)] shadow-sm">
                    <UserCheck className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Godkjenning
                    </p>
                    <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--baladi-gray)]">
                      Du vil motta en e-post når kontoen er godkjent
                    </p>
                  </div>
                </div>
              </div>

              <div className="from-[var(--baladi-primary)]/5 to-[var(--baladi-secondary)]/5 border-[var(--baladi-primary)]/20 rounded-lg border bg-gradient-to-r p-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-[var(--baladi-primary)]/10 flex h-6 w-6 items-center justify-center rounded-full">
                    <Mail className="h-3 w-3 text-[var(--baladi-primary)]" />
                  </div>
                  <div>
                    <p className="mb-1 font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--baladi-dark)]">
                      Viktig informasjon
                    </p>
                    <p className="font-[family-name:var(--font-dm-sans)] text-xs leading-relaxed text-[var(--baladi-gray)]">
                      Du vil motta en e-post så snart kontoen din er godkjent og
                      klar til bruk. Sjekk også søppelpost-mappen din.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--baladi-border)] pt-4">
                <p className="text-center font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                  Har du spørsmål om registreringen din?
                </p>
                <p className="mt-1 text-center font-[family-name:var(--font-dm-sans)] text-sm">
                  <a
                    href="mailto:support@baladiengros.no"
                    className="font-medium text-[var(--baladi-primary)] transition-colors duration-200 hover:text-[var(--baladi-secondary)]"
                  >
                    Kontakt oss
                  </a>
                </p>
              </div>
            </div>
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
