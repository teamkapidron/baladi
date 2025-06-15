import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import {
  Mail,
  MapPin,
  ShoppingCart,
  Heart,
  Package,
  Users,
  Truck,
  Shield,
  Award,
} from '@repo/ui/lib/icons';

interface FooterProps {
  className?: string;
}

function Footer(props: FooterProps) {
  const { className } = props;

  const quickLinks = [
    {
      name: 'Handlekurv',
      href: '/cart',
      icon: ShoppingCart,
      description: 'Se dine valgte produkter',
    },
    {
      name: 'Ønskeliste',
      href: '/wishlist',
      icon: Heart,
      description: 'Dine favoritt produkter',
    },
    {
      name: 'Mine bestillinger',
      href: '/orders',
      icon: Package,
      description: 'Se ordrehistorikk',
    },
    {
      name: 'Mine adresser',
      href: '/addresses',
      icon: MapPin,
      description: 'Administrer leveringsadresser',
    },
  ];

  const companyFeatures = [
    {
      name: 'B2B Engros',
      icon: Users,
      description: 'Profesjonell tjeneste',
    },
    {
      name: 'Rask levering',
      icon: Truck,
      description: 'Neste-dag levering',
    },
    {
      name: 'Sikker handel',
      icon: Shield,
      description: 'Trygg betalingsløsning',
    },
    {
      name: 'Kvalitetsgaranti',
      icon: Award,
      description: 'Beste produkter',
    },
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
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="mb-6 flex items-center space-x-4">
                <Image
                  src="/images/brand/logo.png"
                  alt="Baladi Engros Logo"
                  width={50}
                  height={50}
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-white">
                    Baladi Engros
                  </h2>
                  <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-light)]">
                    Din pålitelige engros-partner
                  </p>
                </div>
              </div>

              <p className="mb-6 font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed text-white/70">
                Vi leverer høykvalitets engrosprodukter til bedrifter over hele
                Norge. Med fokus på kvalitet, service og konkurransedyktige
                priser.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {companyFeatures.map((feature) => (
                  <div key={feature.name} className="group">
                    <div className="flex items-center space-x-2 transition-all duration-200 hover:translate-x-1">
                      <div className="bg-[var(--baladi-accent)]/20 flex h-8 w-8 items-center justify-center rounded-full">
                        <feature.icon
                          size={14}
                          className="text-[var(--baladi-accent)]"
                        />
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium text-white">
                          {feature.name}
                        </p>
                        <p className="font-[family-name:var(--font-dm-sans)] text-xs text-white/60">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <h3 className="relative mb-6 font-[family-name:var(--font-sora)] text-lg font-semibold text-white">
                Hurtiglenker
                <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-[var(--baladi-accent)] to-[var(--baladi-secondary)]" />
              </h3>

              <div className="space-y-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group block transition-all duration-200 hover:translate-x-1"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="group-hover:bg-[var(--baladi-accent)]/20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-200">
                        <link.icon
                          size={16}
                          className="text-[var(--baladi-accent)] transition-all duration-200 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-white transition-colors duration-200 group-hover:text-[var(--baladi-accent)]">
                          {link.name}
                        </p>
                        <p className="font-[family-name:var(--font-dm-sans)] text-xs text-white/60">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-6">
                <Link
                  href="/contact"
                  className="hover:shadow-[var(--baladi-accent)]/25 group inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-[var(--baladi-secondary)] to-[var(--baladi-accent)] px-4 py-2 transition-all duration-200 hover:shadow-lg"
                >
                  <Mail size={16} className="text-white" />
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-white">
                    Kontakt oss
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h3 className="relative mb-6 font-[family-name:var(--font-sora)] text-lg font-semibold text-white">
                Kontaktinformasjon
                <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-[var(--baladi-accent)] to-[var(--baladi-secondary)]" />
              </h3>

              <div className="space-y-4">
                <div className="group flex items-start space-x-3 transition-all duration-200 hover:translate-x-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <Mail size={16} className="text-[var(--baladi-accent)]" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium uppercase tracking-wide text-white/60">
                      E-post
                    </p>
                    <Link
                      href="mailto:info@baladiengros.no"
                      className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80 transition-colors duration-200 hover:text-[var(--baladi-accent)]"
                    >
                      info@baladiengros.no
                    </Link>
                  </div>
                </div>

                <div className="group flex items-start space-x-3 transition-all duration-200 hover:translate-x-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <MapPin size={16} className="text-[var(--baladi-accent)]" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium uppercase tracking-wide text-white/60">
                      Adresse
                    </p>
                    <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
                      Høgskoleringen 1, 1337
                      <br />
                      Høgskoleringen, Norge
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-6 md:space-y-0">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/70">
                © {new Date().getFullYear()} Baladi Engros AS. Alle rettigheter
                forbeholdt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
