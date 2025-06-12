import { memo } from 'react';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';

import FooterSection from './footer-section';
import ContactSection from './contact-section';

interface FooterProps {
  className?: string;
}

function Footer(props: FooterProps) {
  const { className } = props;

  const customerServiceLinks = [
    { text: 'Kontakt Oss', href: '/contact' },
    { text: 'Returpolicy', href: '/return-policy' },
    { text: 'Leveringspolicy', href: '/shipping-policy' },
    { text: 'Ofte Stilte Spørsmål', href: '/faq' },
  ];

  const aboutUsLinks = [
    { text: 'Vår Historie', href: '/about' },
    { text: 'Blogg', href: '/blog' },
    { text: 'Karriere', href: '/careers' },
    { text: 'Bærekraft', href: '/sustainability' },
  ];

  const informationLinks = [
    { text: 'Personvernpolicy', href: '/privacy-policy' },
    { text: 'Vilkår og Betingelser', href: '/terms' },
    { text: 'Informasjonskapsler', href: '/cookies' },
    { text: 'GDPR', href: '/gdpr' },
  ];

  return (
    <footer
      className={cn(
        'bg-gradient-to-br from-[var(--baladi-dark)] via-[var(--baladi-primary-dark)] to-[var(--baladi-dark)] text-white',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="mb-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/brand/logo.png"
                  alt="Baladi Engros Logo"
                  width={60}
                  height={60}
                  className="h-15 w-15 object-contain"
                />
                <div>
                  <h2 className="font-[family-name:var(--font-sora)] text-3xl font-bold text-white">
                    Baladi Engros
                  </h2>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-light)]">
                    Din pålitelige engros-partner
                  </p>
                </div>
              </div>
            </div>
            <p className="mx-auto max-w-2xl font-[family-name:var(--font-dm-sans)] text-lg leading-relaxed text-white/80">
              Vi leverer kvalitetsprodukter til restauranter, kantiner og
              matbedrifter over hele Norge. Med over 20 års erfaring er vi din
              pålitelige partner for alle engrosløsninger.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FooterSection title="Kundeservice" links={customerServiceLinks} />
            <FooterSection title="Om Oss" links={aboutUsLinks} />
            <FooterSection title="Informasjon" links={informationLinks} />
            <ContactSection
              email="info@baladi.com"
              phone="22 68 64 00"
              address="Oslo, Norge"
            />
          </div>
        </div>

        <div className="border-t border-white/20 py-8">
          <div className="mt-6">
            <h4 className="mb-3 font-[family-name:var(--font-sora)] text-sm font-semibold text-white">
              Følg Oss
            </h4>
          </div>
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-6 md:space-y-0">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/70">
                © {new Date().getFullYear()} Baladi Engros AS. Alle rettigheter
                forbeholdt.
              </p>
              <div className="flex space-x-4 text-sm text-white/70">
                <span>Org.nr: 123 456 789</span>
                <span>MVA: NO123456789MVA</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-white">
                  ISO 9001
                </span>
              </div>
              <div className="rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <span className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-white">
                  HACCP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
