import Link from 'next/link';
import React, { memo, useMemo } from 'react';
import { ChevronRight } from '@repo/ui/lib/icons';

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
          className="group flex items-center justify-between font-[family-name:var(--font-dm-sans)] text-sm text-white/80 transition-all duration-200 hover:translate-x-1 hover:text-white"
        >
          <span>{link.text}</span>
          <ChevronRight
            size={14}
            className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
          />
        </Link>
      </li>
    ));
  }, [links]);

  return (
    <div className="space-y-6">
      <h3 className="relative font-[family-name:var(--font-sora)] text-lg font-semibold text-white">
        {title}
        <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-[var(--baladi-accent)] to-[var(--baladi-secondary)]" />
      </h3>
      <ul className="space-y-4">{linksItems}</ul>
    </div>
  );
}

export default memo(FooterSection);
