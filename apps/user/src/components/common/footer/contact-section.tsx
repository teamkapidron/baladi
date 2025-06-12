import Link from 'next/link';
import React, { memo } from 'react';
import { Mail, Phone, MapPin } from '@repo/ui/lib/icons';

interface ContactSectionProps {
  email: string;
  phone: string;
  address: string;
}

function ContactSection(props: ContactSectionProps) {
  const { email, phone, address } = props;

  return (
    <div className="space-y-6">
      <h3 className="relative font-[family-name:var(--font-sora)] text-lg font-semibold text-white">
        Kontakt
        <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-[var(--baladi-accent)] to-[var(--baladi-secondary)]" />
      </h3>

      <div className="space-y-4">
        <div className="group flex items-center space-x-3 transition-all duration-200 hover:translate-x-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <Mail size={16} className="text-[var(--baladi-accent)]" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-white/60">
              E-post
            </p>
            <Link
              href={`mailto:${email}`}
              className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80 transition-colors duration-200 hover:text-white"
            >
              {email}
            </Link>
          </div>
        </div>

        <div className="group flex items-center space-x-3 transition-all duration-200 hover:translate-x-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <Phone size={16} className="text-[var(--baladi-accent)]" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-white/60">
              Telefon
            </p>
            <Link
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80 transition-colors duration-200 hover:text-white"
            >
              {phone}
            </Link>
          </div>
        </div>

        <div className="group flex items-center space-x-3 transition-all duration-200 hover:translate-x-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <MapPin size={16} className="text-[var(--baladi-accent)]" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-white/60">
              Adresse
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/80">
              {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ContactSection);
