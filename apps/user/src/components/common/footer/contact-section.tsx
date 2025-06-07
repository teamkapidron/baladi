import Link from 'next/link';
import React, { memo } from 'react';
import { FacebookIcon, InstagramIcon } from '@repo/ui/lib/icons';

interface ContactSectionProps {
  email: string;
  phone: string;
  address: string;
}

function ContactSection(props: ContactSectionProps) {
  const { email, phone, address } = props;

  return (
    <div>
      <h3 className="footer-heading">Contact</h3>
      <div className="space-y-3">
        <p className="text-sm text-gray-600">Email: {email}</p>
        <p className="text-sm text-gray-600">Phone: {phone}</p>
        <p className="mb-5 text-sm text-gray-600">Address: {address}</p>
        <div className="flex space-x-5">
          <Link
            href="https://www.facebook.com/baladi.no"
            className="text-gray-600 transition-colors hover:text-[var(--color-primary)]"
            aria-label="Facebook"
          >
            <FacebookIcon className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/baladi.no"
            className="text-gray-600 transition-colors hover:text-[var(--color-primary)]"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(ContactSection);
