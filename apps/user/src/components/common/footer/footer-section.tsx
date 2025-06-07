import Link from 'next/link';
import React, { memo, useMemo } from 'react';

interface FooterLink {
  text: string;
  href: string;
}

interface FooterSectionProps {
  title: string;
  links: FooterLink[];
}

function FooterSection(props: FooterSectionProps) {
  const { title, links } = props;

  const linksItems = useMemo(() => {
    return links.map((link, index) => (
      <li key={index}>
        <Link
          href={link.href}
          className="text-sm text-gray-600 transition-colors hover:text-[var(--color-primary)]"
        >
          {link.text}
        </Link>
      </li>
    ));
  }, [links]);

  return (
    <div>
      <h3 className="footer-heading">{title}</h3>
      <ul className="space-y-3">{linksItems}</ul>
    </div>
  );
}

export default memo(FooterSection);
