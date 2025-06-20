'use client';

import { Mail, MapPin, Phone, Clock } from '@repo/ui/lib/icons';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/base/card';
import ContactForm from './contact-form';

export default function ContactContent() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'E-post',
      content: 'info@baladiengros.no',
      description: 'Send oss en e-post',
      href: 'mailto:info@baladiengros.no',
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: '+47 123 45 678',
      description: 'Ring oss i arbeidstiden',
      href: 'tel:+4712345678',
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Høgskoleringen 1, 1337 Høgskoleringen',
      description: 'Besøk vårt lager',
      href: 'https://maps.google.com/?q=Høgskoleringen+1,+1337+Høgskoleringen',
    },
    {
      icon: Clock,
      title: 'Åpningstider',
      content: 'Man-Fre: 08:00-16:00',
      description: 'Våre kontortider',
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-[family-name:var(--font-sora)] text-4xl font-bold text-[var(--baladi-dark)] md:text-5xl">
          Kontakt oss
        </h1>
        <p className="mx-auto max-w-3xl font-[family-name:var(--font-dm-sans)] text-lg text-[var(--baladi-gray)] md:text-xl">
          Vi er her for å hjelpe deg med alle dine engrosprodukter. Ta kontakt
          med oss i dag for å diskutere dine behov eller få svar på spørsmål.
        </p>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contactInfo.map((info, index) => (
          <Card
            key={index}
            className="group border-[var(--baladi-border)] bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <CardHeader className="pb-4">
              <div className="mb-4 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--baladi-primary)] to-[var(--baladi-secondary)]">
                  <info.icon size={28} className="text-white" />
                </div>
              </div>
              <CardTitle className="text-center font-[family-name:var(--font-sora)] text-lg font-semibold text-[var(--baladi-dark)]">
                {info.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {info.href ? (
                <a
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2 block font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-primary)] transition-colors hover:text-[var(--baladi-secondary)]"
                >
                  {info.content}
                </a>
              ) : (
                <p className="mb-2 font-[family-name:var(--font-dm-sans)] font-semibold text-[var(--baladi-primary)]">
                  {info.content}
                </p>
              )}
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--baladi-gray)]">
                {info.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Company Information */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-6 font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-dark)]">
              Om Baladi Engros
            </h2>
            <div className="space-y-6">
              <p className="font-[family-name:var(--font-dm-sans)] text-base leading-relaxed text-[var(--baladi-gray)]">
                Baladi Engros AS er din pålitelige partner for høykvalitets
                engrosprodukter. Vi spesialiserer oss på asiatiske og
                orientalske ingredienser og leverer til bedrifter over hele
                Norge.
              </p>
              <p className="font-[family-name:var(--font-dm-sans)] text-base leading-relaxed text-[var(--baladi-gray)]">
                Med mange års erfaring i bransjen forstår vi viktigheten av
                kvalitet, pålitelighet og konkurransedyktige priser. Vårt team
                er dedikert til å gi deg den beste servicen og produktene som
                passer dine behov.
              </p>
            </div>
          </div>

          <Card className="border-[var(--baladi-border)] bg-gradient-to-br from-[var(--baladi-muted)] to-white">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[var(--baladi-dark)]">
                Våre tjenester
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  'Høykvalitets engrosprodukter',
                  'Konkurransedyktige priser for bedrifter',
                  'Rask og pålitelig levering',
                  'Personlig kundeservice',
                  'Tilpassede løsninger for dine behov',
                  'Kvalitetskontroll på alle produkter',
                ].map((service, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-[var(--baladi-accent)]" />
                    <span className="font-[family-name:var(--font-dm-sans)] text-[var(--baladi-gray)]">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="mb-6 font-[family-name:var(--font-sora)] text-3xl font-bold text-[var(--baladi-dark)]">
            Send oss en melding
          </h2>

          <ContactForm />
        </div>
      </div>
    </main>
  );
}
