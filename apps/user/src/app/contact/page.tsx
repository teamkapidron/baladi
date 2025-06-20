import { Metadata } from 'next';

import Header from '@/components/common/header/header';
import ContactContent from '@/components/contact/contact-content';
import Footer from '@/components/common/footer/footer';

export const metadata: Metadata = {
  title: 'Kontakt oss | Baladi Engros',
  description:
    'Ta kontakt med Baladi Engros. Vi er her for å hjelpe deg med alle dine engrosprodukter.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--baladi-background)]">
      <Header />
      <ContactContent />
      <Footer />
    </div>
  );
}
