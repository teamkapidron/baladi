import { memo } from 'react';
import { cn } from '@repo/ui/lib/utils';

import FooterSection from './footer-section';
import ContactSection from './contact-section';

interface FooterProps {
  className?: string;
}

function Footer(props: FooterProps) {
  const { className } = props;

  const customerServiceLinks = [
    { text: 'Contact Us', href: '#' },
    { text: 'Return Policy', href: '#' },
    { text: 'Shipping Policy', href: '#' },
    { text: 'FAQ', href: '#' },
  ];

  const aboutUsLinks = [
    { text: 'Our Story', href: '#' },
    { text: 'Blog', href: '#' },
    { text: 'Careers', href: '#' },
  ];

  const informationLinks = [
    { text: 'Privacy Policy', href: '#' },
    { text: 'Terms & Conditions', href: '#' },
    { text: 'Cookie Policy', href: '#' },
  ];

  return (
    <div className={cn('pb-8 pt-12', className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-4">
          <FooterSection
            title="Customer Service"
            links={customerServiceLinks}
          />
          <FooterSection title="About Us" links={aboutUsLinks} />
          <FooterSection title="Information" links={informationLinks} />
          <ContactSection
            email="info@baladi.com"
            phone="22 68 64 00"
            address="Oslo, Norway"
          />
        </div>

        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Baladi. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(Footer);
