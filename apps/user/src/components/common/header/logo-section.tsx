import Link from 'next/link';
import Image from 'next/image';
import { memo } from 'react';

function LogoSection() {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center">
        <Image
          src="/images/brand/logo.png"
          alt="Baladi Logo"
          width={80}
          height={45}
          className="h-auto object-contain"
        />
      </Link>
    </div>
  );
}

export default memo(LogoSection);
